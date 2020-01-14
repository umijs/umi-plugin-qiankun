export default {
  base: '/app3',
  publicPath: '/app3/',
  outputPath: './dist/app3',
  mountElementId: 'app3',
  plugins: [
    ['../../index.js'],
    [
      'umi-plugin-react',
      {
        title: 'app3',
        antd: true,
        dva: {
          immer: true,
          hmr: true,
        },
        dynamicImport: true,
        routes: [
          { path: '/', exact: true, component: './pages/index.js' },
          { path: '/:abc', component: './pages/$abc.js' },
          { path: '/users', component: './pages/users/index.js' },
        ],
      },
    ],
  ],
};
