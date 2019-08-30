import assert from 'assert';
import { join } from 'path';
import { IApi } from 'umi-types';
import { defaultSlaveRootId } from '../common';

const webpack = require('webpack');

export default function(api: IApi) {
  const lifecyclePath = require.resolve('./lifecycles');
  const mountElementId = api.config.mountElementId || defaultSlaveRootId;
  const app = api.config.mountElementId;
  const port = process.env.PORT;
  const protocol = process.env.HTTPS ? 'https' : 'http';

  api.modifyDefaultConfig(memo => {
    const { name: pkgName } = require(join(api.cwd, 'package.json'));

    return {
      ...memo,
      // TODO 临时关闭，等这个 pr 合并 https://github.com/umijs/umi/pull/2866
      // disableGlobalVariables: true,
      base: `/${pkgName}`,
      mountElementId,
    };
  });

  api.modifyWebpackConfig(memo => {
    memo.output!.libraryTarget = 'umd';
    assert(api.pkg.name, `You should have name in package.json`);
    memo.output!.library = api.pkg.name;
    memo.output!.jsonpFunction = `webpackJsonp_${api.pkg.name}`;
    // 配置 publicPath，支持 hot update
    if (process.env.NODE_ENV === 'development') {
      memo.output!.publicPath = `${protocol}://localhost:${port}/`;
    }
    return memo;
  });

  // source-map 跨域设置
  if (process.env.NODE_ENV === 'development') {
    // 变更 webpack-dev-server websocket 默认监听地址
    process.env.SOCKET_SERVER = `${protocol}://localhost:${port}/`;
    api.chainWebpackConfig((memo) => {
        // 禁用 devtool，启用 SourceMapDevToolPlugin
        memo.devtool(false);
        memo.plugin('source-map').use(webpack.SourceMapDevToolPlugin, [{
          namespace: app,
          append: `\n//# sourceMappingURL=${protocol}://localhost:${port}/[url]`,
          filename: '[name].js.map',
        }]);
    });
  }

  api.addRuntimePlugin(require.resolve('./runtimePlugin'));
  api.writeTmpFile(
    'qiankunContext.js',
    `
import { createContext, useContext } from 'react';

export const Context = createContext(null);
export function useRootExports() {
  return useContext(Context);
};
  `.trim(),
  );
  api.addUmiExports([
    {
      specifiers: ['useRootExports'],
      source: '@tmp/qiankunContext',
    },
  ]);

  api.addRuntimePluginKey('qiankun');

  api.addEntryImport({
    source: lifecyclePath,
    specifier:
      '{ genMount as qiankun_genMount, genBootstrap as qiankun_genBootstrap, genUnmount as qiankun_genUnmount }',
  });
  api.addRendererWrapperWithModule(lifecyclePath);
  api.addEntryCode(
    `
    export const bootstrap = qiankun_genBootstrap(Promise.all(moduleBeforeRendererPromises), render);
    export const mount = qiankun_genMount();
    export const unmount = qiankun_genUnmount('${mountElementId}');
    `,
  );
}
