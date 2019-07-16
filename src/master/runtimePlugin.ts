import '@tmp/qiankunRootExports.js';
import subAppConfig from '@tmp/subAppsConfig.json';
import { registerMicroApps, start } from 'qiankun';
import React from 'react';
import ReactDOM from 'react-dom';
import { defaultMountContainerId, noop } from '../common';

export function render(oldRender: typeof noop) {
  oldRender();

  function isAppActive(location: Location, routerBase: string) {
    // TODO 支持 browserHistory， 根据当前配置的 history 类型决定
    return location.hash.startsWith(routerBase);
  }

  const { apps, jsSandbox = false, prefetch = true } = subAppConfig;
  registerMicroApps(
    apps.map(({ name, entry, routerBase, mountElementId = defaultMountContainerId, ...props }) => {

      return {
        name,
        entry,
        activeRule: location => isAppActive(location, routerBase),
        render: ({ appContent, loading }) => {
          if (process.env.NODE_ENV === 'development') {
            console.info(`app ${name} loading ${loading}`);
          }
        },
        props,
      };
    }),
  );

  start({ jsSandbox, prefetch });
}
