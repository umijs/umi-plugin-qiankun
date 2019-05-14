import { IApi, IConfig } from 'umi-types';

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

  api.onGenerateFiles(() => {
    api.writeTmpFile('singleSpaApps.json', JSON.stringify(options.apps));
  });
};
