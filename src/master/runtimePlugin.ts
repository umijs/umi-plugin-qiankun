/* eslint-disable import/no-unresolved, import/extensions */

// eslint-disable-next-line import/extensions
import { deferred } from '@tmp/qiankunDefer.js';
import '@tmp/qiankunRootExports.js';
import subAppConfig from '@tmp/subAppsConfig.json';
import assert from 'assert';
import { registerMicroApps, start } from 'qiankun';
import React from 'react';
import ReactDOM from 'react-dom';
import { IConfig } from 'umi-types';
import { defaultHistoryMode, defaultMountContainerId, noop, toArray } from '../common';
import { App, Options } from '../types';

async function getMasterRuntime() {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const plugins = require('umi/_runtimePlugin');
  return plugins.mergeConfigAsync('qiankun');
}

export async function render(oldRender: typeof noop) {
  oldRender();

  function isAppActive(location: Location, history: IConfig['history'], base: App['base']) {
    const baseConfig = toArray(base);

    switch (history) {
      case 'hash':
        return baseConfig.some(pathPrefix => location.hash.startsWith(`#${pathPrefix}`));

      case 'browser':
        return baseConfig.some(pathPrefix => location.pathname.startsWith(pathPrefix));

      default:
        return false;
    }
  }

  const runtimeConfig = await getMasterRuntime();
  const { apps, jsSandbox = false, prefetch = true, defer = false, lifeCycles, ...otherConfigs } = {
    ...(subAppConfig as Options),
    ...(runtimeConfig as Options),
  };
  assert(apps && apps.length, 'sub apps must be config when using umi-plugin-qiankun');

  registerMicroApps(
    apps.map(
      ({ name, entry, base, history = defaultHistoryMode, mountElementId = defaultMountContainerId, props }) => ({
        name,
        entry,
        activeRule: location => isAppActive(location, history, base),
        render: ({ appContent, loading }) => {
          if (process.env.NODE_ENV === 'development') {
            console.info(`app ${name} loading ${loading}`);
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
            }
          }
        },
        props,
      }),
    ),
    lifeCycles,
  );

  if (defer) {
    await deferred.promise;
  }

  start({ jsSandbox, prefetch, ...otherConfigs });
}
