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
