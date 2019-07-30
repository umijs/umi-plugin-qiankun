export default {
  devServer: {
    historyApiFallback: true,
  },
  proxy: {
    '/api/app1': {
      target: 'http://localhost:8001',
      changeOrigin: true,
    },
  },
  plugins: [
    [
      '../../master',
      {
        apps: [
          {
            name: 'app1',
            entry: 'http://localhost:8001/app1',
            base: '/app1',
            mountElementId: 'root-slave',
          },
          {
            name: 'app2',
            entry: 'http://localhost:8002/app2',
            base: '/app2',
            mountElementId: 'root-slave',
          },
        ],
        jsSandbox: true,
        prefetch: true,
      },
    ],
    [
      'umi-plugin-react',
      {
        title: 'qiankun-demo',
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
