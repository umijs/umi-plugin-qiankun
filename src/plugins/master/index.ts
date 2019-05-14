import { IApi, IConfig } from 'umi-types';
import { join } from 'path';
import { existsSync } from 'fs';

interface ISlave {
  scripts?: [],
  styles?: [],
}

interface IOptions {
  apps?: ISlave[],
}

export default function(api: IApi, options: IOptions = {}) {
  api.addRuntimePlugin(require.resolve('./runtimePlugin'));

  api.modifyDefaultConfig(config => {
    return {
      ...config,
      disableGlobalVariables: true,
    } as IConfig;
  });

  const rootExportsFile = join(api.paths.absSrcPath, 'rootExports.js');
  api.addPageWatcher(rootExportsFile);

  api.onGenerateFiles(() => {
    const rootExports = `
window.g_rootExports = ${existsSync(rootExportsFile) ? `require('@/rootExports')` : `{}`};
    `.trim();
    api.writeTmpFile('singleSpaRootExports.js', rootExports);
    api.writeTmpFile('singleSpaApps.json', JSON.stringify(options.apps));
  });
};
