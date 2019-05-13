import { IApi, IConfig } from 'umi-types';
import assert from 'assert';

interface IOptions {
  base?: string;
}

export default function(api: IApi, options: IOptions = {}) {
  const lifecyclePath = require.resolve('./lifecycles');
  const mountElementId = 'app-root';

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      disableGlobalVariables: true,
      // TODO: 支持 browser history
      history: 'hash',
      mountElementId,
    } as IConfig;
  });

  api.chainWebpackConfig(memo => {
    memo.output.libraryTarget('umd');
    assert(
      api.pkg.name,
      `You should have name in package.json`,
    );
    memo.output.library(api.pkg.name);
    memo.output.jsonpFunction(`webpackJsonp_${api.pkg.name}`);
    return memo;
  });

  api.modifyWebpackConfig(memo => {
    Object.keys(memo.entry).forEach(key => {
      memo.entry[key] = memo.entry[key].filter(filePath => {
        return !filePath.includes('webpackHotDevClient');
      });
    });
    return memo;
  });

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
