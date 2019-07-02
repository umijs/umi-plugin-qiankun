export default {
  history: 'hash',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dynamicImport: {
          loadingComponent: './pages/loading.jsx',
        },
      },
    ],
    [
      '../../master',
      {
        apps: [
          {
            name: 'app1',
            routerBase: '#/app1',
            entry: 'http://localhost:8002',
          },
          {
            name: 'app2',
            routerBase: '#/app2',
            entry: 'http://localhost:8003',
          },
        ],
      },
    ],
  ],
};
