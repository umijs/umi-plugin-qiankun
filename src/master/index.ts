import { existsSync } from 'fs';
import { join } from 'path';
import { IApi } from 'umi-types';
import IConfig from 'umi-types/config';
import { defaultHistoryMode, defaultMasterRootId, toArray } from '../common';
import { Options } from '../types';

export default function(api: IApi, options: Options = {}) {
  api.addRuntimePlugin(require.resolve('./runtimePlugin'));
  api.addRuntimePluginKey('qiankun');

  api.modifyDefaultConfig(config => {
    return {
      ...config,
      mountElementId: defaultMasterRootId,
      disableGlobalVariables: true,
    };
  });

  const { config: { history = defaultHistoryMode } } = api;
  // apps 可能在构建期为空
  const { apps = [] } = options;

  function modifyAppRoutes(masterHistory: IConfig['history']) {
    api.modifyRoutes(routes => {
      const newRoutes = routes.map(route => {
        if (route.path === '/') {
          if (route.routes && route.routes.length) {
            apps.forEach(({ history: slaveHistory = defaultHistoryMode, base }) => {
              // 当子应用的 history mode 跟主应用一致时，为避免出现 404 手动为主应用创建一个 path 为 子应用 rule 的空 div 路由组件
              if (slaveHistory === masterHistory) {
                const baseConfig = toArray(base);
                baseConfig.forEach(basePath => route.routes!.unshift({
                  path: `${basePath}/(.*)`,
                  component: `() => {
              if (process.env.NODE_ENV === 'development') {
                console.log('${basePath} 404 mock rendered');
              }
              
              return React.createElement('div');
            }`,
                }));
              }
            });
          }
        }

        return route;
      });

      return newRoutes;
    });
  }

  modifyAppRoutes(history);

  const rootExportsFile = join(api.paths.absSrcPath, 'rootExports.js');
  api.addPageWatcher(rootExportsFile);

  api.onGenerateFiles(() => {
    const rootExports = `
window.g_rootExports = ${existsSync(rootExportsFile) ? `require('@/rootExports')` : `{}`};
    `.trim();
    api.writeTmpFile('qiankunRootExports.js', rootExports);
    api.writeTmpFile('subAppsConfig.json', JSON.stringify(options));
  });
}
