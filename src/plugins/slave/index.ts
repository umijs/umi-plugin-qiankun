import { IApi, IConfig } from 'umi-types';
import assert from 'assert';

interface IOptions {
  mountElementId?: string;
}

export default function(api: IApi, options: IOptions = {}) {
  const lifecyclePath = require.resolve('./lifecycles');
  const mountElementId = options.mountElementId || 'app-root';

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      disableGlobalVariables: true,
      // TODO: 支持 browser history
      history: 'hash',
      mountElementId,
    } as IConfig;
  });

  api.modifyWebpackConfig(memo => {
    memo.output.libraryTarget = 'umd';
    assert(
      api.pkg.name,
      `You should have name in package.json`,
    );
    memo.output.library = api.pkg.name;
    memo.output.jsonpFunction = `webpackJsonp_${api.pkg.name}`;
    return memo;
  });

  api.addRuntimePlugin(require.resolve('./runtimePlugin'));
  api.writeTmpFile('singleSpaContext.js', `
import { createContext, useContext } from 'react';

export const Context = createContext(null);
export function useRootExports() {
  return useContext(Context);
};
  `.trim());
  api.addUmiExports([
    {
      specifiers: ['useRootExports'],
      source:'@tmp/singleSpaContext',
    },
  ]);

  api.addRuntimePluginKey('singleSpa');

  api.addEntryImport({
    source: lifecyclePath,
    specifier:
      '{ genMount as singleSPA_genMount, genBootstrap as singleSPA_genBootstrap, genUnmount as singleSPA_genUnmount }',
  });
  api.addRendererWrapperWithModule(lifecyclePath);
  api.addEntryCode(
    `
    export const bootstrap = singleSPA_genBootstrap(Promise.all(moduleBeforeRendererPromises), render);
    export const mount = singleSPA_genMount();
    export const unmount = singleSPA_genUnmount('${mountElementId}');
    `,
  );
};
