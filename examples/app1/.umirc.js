import { name } from './package';

export default {
  base: '/app1',
  history: 'browser',
  publicPath: '/app1/',
  outputPath: './dist/app1',
  mountElementId: 'app1',
  // chainWebpack(memo,{webpack}){
  //   if (process.env.NODE_ENV === 'development') {
  //     const app = 'app1';
  //     const port = process.env.PORT;
  //     // 禁用 devtool，启用 SourceMapDevToolPlugin
  //     memo.devtool(false);
  //     memo.plugin('source-map').use(webpack.SourceMapDevToolPlugin, [{
  //       namespace: app,
  //       append: `\n//# sourceMappingURL=http://localhost:${port}/[url]`,
  //       filename: '[name].js.map',
  //     }]);
  //   }
  // },
  plugins: [
    ['../../slave.js'],
    [
      'umi-plugin-react',
      {
        title: 'app1',
        antd: true,
        dva: {
          immer: true,
          hmr: true,
        },
        dynamicImport: false, //开发模式下，qiankun加载子应用会和dynamicImport冲突
        routes: {
          exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/],
        },
      },
    ],
  ],
};
