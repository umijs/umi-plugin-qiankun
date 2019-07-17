import '@tmp/qiankunRootExports.js';
import subAppConfig from '@tmp/subAppsConfig.json';
import { registerMicroApps, start } from 'qiankun';
import React from 'react';
import ReactDOM from 'react-dom';
import { IConfig } from 'umi-types';
import { defaultHistoryMode, defaultMountContainerId, noop } from '../common';
import { Options } from '../types';

export function render(oldRender: typeof noop) {
  oldRender();

  function isAppActive(location: Location, history: IConfig['history'], base: IConfig['base'] = '/') {
    switch (history) {
      case 'hash':
        return location.hash.startsWith(`#${base}`);

      case 'browser':
        return location.pathname.startsWith(base);

      default:
        return false;
    }
  }

  const { apps, jsSandbox = false, prefetch = true } = subAppConfig as Options;
  registerMicroApps(
    apps.map(({ name, entry, base, history = defaultHistoryMode, mountElementId = defaultMountContainerId, ...props }) => {

      return {
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
      };
    }),
  );

  start({ jsSandbox, prefetch });
}
