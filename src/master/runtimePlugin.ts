import '@tmp/qiankunRootExports.js';
import subAppConfig from '@tmp/subAppsConfig.json';
import { registerMicroApps, start } from 'qiankun';
import { noop } from '../utils';

export function render(oldRender: typeof noop) {
  oldRender();

  function isAppActive(location: Location, routerBase: string) {
    // TODO 支持 browserHistory， 根据当前配置的 history 类型决定
    return location.hash.startsWith(routerBase);
  }

  const { apps, jsSandbox = false, prefetch = true } = subAppConfig;
  registerMicroApps(
    apps.map(({ name, entry, routerBase, ...props }) => {
      return {
        name,
        entry,
        activeRule: location => isAppActive(location, routerBase),
        render: ({ appContent, loading }) => {
          if (process.env.NODE_ENV === 'development') {
            console.info(`app ${name} loading ${loading} with html content: ${appContent}`);
          }
        },
        props,
      };
    }),
  );

  start({ jsSandbox, prefetch });
}
