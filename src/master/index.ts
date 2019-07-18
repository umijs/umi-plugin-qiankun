import assert from 'assert';
import { existsSync } from 'fs';
import { join } from 'path';
import { IApi } from 'umi-types';
import IConfig from 'umi-types/config';
import { defaultHistoryMode, defaultMasterRootId } from '../common';
import { Options } from '../types';

export default function(api: IApi, options: Options) {
  assert(options && options.apps && options.apps.length, 'sub apps must be config when using umi-plugin-qiankun');
  api.addRuntimePlugin(require.resolve('./runtimePlugin'));

  api.modifyDefaultConfig(config => {
    return {
      ...config,
      mountElementId: defaultMasterRootId,
      disableGlobalVariables: true,
    };
  });

  const { config: { history = defaultHistoryMode } } = api;
  const { apps } = options;

  function modifyAppRoutes(masterHistory: IConfig['history']) {
    api.modifyRoutes(routes => {
      const newRoutes = [...routes];
      apps.forEach(({ history: slaveHistory = defaultHistoryMode, base }) => {
        // 当子应用的 history mode 跟主应用一致时，为避免出现 404 手动为主应用创建一个 path 为 子应用 rule 的空 div 路由组件
        if (slaveHistory === masterHistory) {
          newRoutes.push({ path: `${base}/*`, component: `() => React.createElement('div')` });
        }
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
