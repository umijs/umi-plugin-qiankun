import { existsSync } from 'fs';
import { join } from 'path';
import { IApi } from 'umi-types';

interface IApp {
  scripts?: [];
  styles?: [];
}

interface IOptions {
  apps?: IApp[];
}

export default function(api: IApi, options: IOptions = {}) {
  api.addRuntimePlugin(require.resolve('./runtimePlugin'));

  api.modifyDefaultConfig(config => {
    return {
      ...config,
      disableGlobalVariables: true,
    };
  });

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
