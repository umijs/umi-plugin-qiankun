import { name } from './package';

export default {
  base: '/app1',
  history: 'browser',
  publicPath: '/app1/',
  outputPath: './dist/app1',
  plugins: [
    [
      '../../slave.js',
      {
        mountElementId: 'app1',
      },
    ],
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
