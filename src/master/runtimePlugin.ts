/* eslint-disable import/no-unresolved, import/extensions */

import { deferred } from '@tmp/qiankunDefer.js';
import '@tmp/qiankunRootExports.js';
import subAppConfig from '@tmp/subAppsConfig.json';
import assert from 'assert';
import { registerMicroApps, start } from 'qiankun';
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IConfig } from 'umi-types';
import { defaultMountContainerId, noop, testPathWithPrefix, toArray } from '../common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { App, GlobalOptions, Options } from '../types';

async function getMasterRuntime() {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const plugins = require('umi/_runtimePlugin');
  const config: GlobalOptions = (await plugins.mergeConfigAsync('qiankun')) || {};
  const { master } = config;
  return master || config;
}

export async function render(oldRender: typeof noop) {
  oldRender();

  function isAppActive(
    location: Location,
    history: IConfig['history'],
    opts: { base: App['base']; setMatchedBase: (v: string) => void },
  ) {
    const { base, setMatchedBase } = opts;
    const baseConfig = toArray(base);

    switch (history) {
      case 'hash': {
        const matchedBase = baseConfig.find(pathPrefix => testPathWithPrefix(`#${pathPrefix}`, location.hash));
        if (matchedBase) {
          setMatchedBase(matchedBase);
        }

        return !!matchedBase;
      }

      case 'browser': {
        const matchedBase = baseConfig.find(pathPrefix => testPathWithPrefix(pathPrefix, location.pathname));
        if (matchedBase) {
          setMatchedBase(matchedBase);
        }

        return !!matchedBase;
      }

      default:
        return false;
    }
  }

  const runtimeConfig = await getMasterRuntime();
  const { apps, jsSandbox = false, prefetch = true, defer = false, lifeCycles, masterHistory, ...otherConfigs } = {
    ...(subAppConfig as Options),
    ...(runtimeConfig as Options),
  };
  assert(apps && apps.length, 'sub apps must be config when using umi-plugin-qiankun');

  registerMicroApps(
    apps.map(({ name, entry, base, history = masterHistory, mountElementId = defaultMountContainerId, props }) => {
      let matchedBase = base;

      return {
        name,
        entry,
        activeRule: location =>
          isAppActive(location, history, { base, setMatchedBase: (v: string) => (matchedBase = v) }),
        render: ({ appContent, loading }) => {
          if (process.env.NODE_ENV === 'development') {
            console.info(`[@umijs/plugin-qiankun]: app ${name} loading ${loading}`);
          }

          if (mountElementId) {
            const container = document.getElementById(mountElementId);
            if (container) {
              const subApp = React.createElement('div', {
                dangerouslySetInnerHTML: {
                  __html: appContent,
                },
              });
              ReactDOM.render(subApp, container);
            } else if (process.env.NODE_ENV === 'development') {
              console.warn(`[@umijs/plugin-qiankun]: Your ${name} app container with id ${mountElementId} is not
               ready, that may cause an unexpected behavior!`);
            }
          }
        },
        props: {
          base,
          history,
          getMatchedBase() {
            return matchedBase;
          },
          ...props,
        },
      };
    }),
    lifeCycles,
    { ...otherConfigs },
  );

  if (defer) {
    await deferred.promise;
  }

  start({ jsSandbox, prefetch, ...otherConfigs });
}
