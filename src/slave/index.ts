/*  eslint-disable no-param-reassign */
import assert from 'assert';
import { join } from 'path';
import address from 'address';
// eslint-disable-next-line import/no-unresolved
import { IApi } from 'umi-types';
import webpack from 'webpack';
import { defaultSlaveRootId } from '../common';
import { Options } from '../types';

const localIpAddress = process.env.USE_REMOTE_IP ? address.ip() : 'localhost';

export default function(api: IApi, options: Options) {
  const { registerRuntimeKeyInIndex = false } = options || {};
  api.addRuntimePlugin(require.resolve('./runtimePlugin'));
  if (!registerRuntimeKeyInIndex) {
    api.addRuntimePluginKey('qiankun');
  }

  const lifecyclePath = require.resolve('./lifecycles');
  const mountElementId = api.config.mountElementId || defaultSlaveRootId;
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const { name: pkgName } = require(join(api.cwd, 'package.json'));
  api.modifyDefaultConfig(memo => ({
    ...memo,
    // TODO 临时关闭，等这个 pr 合并 https://github.com/umijs/umi/pull/2866
    // disableGlobalVariables: true,
    base: `/${pkgName}`,
    mountElementId,
  }));

  // 如果开启了 runtimePublicPath，则直接使用 qiankun 注入的 publicPath
  if (api.config.runtimePublicPath) {
    api.modifyPublicPathStr('window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__');
  }

  const port = process.env.PORT;
  const protocol = process.env.HTTPS ? 'https' : 'http';
  api.modifyWebpackConfig(memo => {
    memo.output!.libraryTarget = 'umd';
    assert(api.pkg.name, 'You should have name in package.json');
    memo.output!.library = `${api.pkg.name}-[name]`;
    memo.output!.jsonpFunction = `webpackJsonp_${api.pkg.name}`;
    // 配置 publicPath，支持 hot update
    if (process.env.NODE_ENV === 'development' && port) {
      memo.output!.publicPath = `${protocol}://${localIpAddress}:${port}/`;
    }
    return memo;
  });

  // umi bundle 添加 entry 标记
  api.modifyHTMLWithAST($ => {
    $('script').each((_, el) => {
      const scriptEl = $(el);
      const umiEntryJs = /\/?umi(\.\w+)?\.js$/g;
      if (umiEntryJs.test(scriptEl.attr('src'))) {
        scriptEl.attr('entry', '');
      }
    });
  });

  // source-map 跨域设置
  if (process.env.NODE_ENV === 'development' && port) {
    // 变更 webpack-dev-server websocket 默认监听地址
    process.env.SOCKET_SERVER = `${protocol}://${localIpAddress}:${port}/`;
    api.chainWebpackConfig(memo => {
      // 禁用 devtool，启用 SourceMapDevToolPlugin
      memo.devtool(false);
      memo.plugin('source-map').use(webpack.SourceMapDevToolPlugin, [
        {
          namespace: pkgName,
          append: `\n//# sourceMappingURL=${protocol}://${localIpAddress}:${port}/[url]`,
          filename: '[file].map',
        },
      ]);
    });
  }

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

    if (!window.__POWERED_BY_QIANKUN__) {
      bootstrap().then(mount);
    }
    `,
  );
}
