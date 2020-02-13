import { name } from './package';

export default {
  base: name,
  publicPath: '/app2/',
  outputPath: './dist/app2',
  mountElementId: 'app2',
  plugins: [
    ['../../slave', {
      keepOriginalRoutes: true
    }],
    [
      'umi-plugin-react',
      {
        title: 'app2',
        antd: true,
        dva: {
          immer: true,
          hmr: true,
        },
        dynamicImport: true,
        routes: {
          exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/],
        },
      },
    ],
  ],
};
