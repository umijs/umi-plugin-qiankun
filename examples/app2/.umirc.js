import { name } from './package';

export default {
  base: name,
  history: 'browser',
  publicPath: '/app2/',
  outputPath: './dist/app2',
  plugins: [
    [
      '../../slave.js',
      {
        mountElementId: 'app2',
      },
    ],
    [
      'umi-plugin-react',
      {
        title: 'app2',
        antd: true,
        dva: {
          immer: true,
          hmr: true,
        },
        dynamicImport: false,
        routes: {
          exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/],
        },
      },
    ],
  ],
};
