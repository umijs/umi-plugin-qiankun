import apps from '@tmp/microApps.json';
import '@tmp/qiankunRootExports.js';
import { registerMicroApps, start } from 'qiankun';
import { noop } from '../utils';

export function render(oldRender: typeof noop) {
  oldRender();

  function isAppActive(location: Location, routerBase: string) {
    // TODO 支持 browserHistory， 根据当前配置的 history 类型决定
    return location.hash.startsWith(routerBase);
  }

  registerMicroApps(apps.map(({ name, entry, routerBase, ...props }) => {
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
  }));

  // TODO 是否 jsSandbox 及 prefetch 应该从配置中取
  start({ jsSandbox: true, prefetch: true });
}
