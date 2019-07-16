export default {
  plugins: [
    [
      '../../master',
      {
        apps: [
          {
            name: 'app1',
            routerBase: '#/app1',
            entry: 'http://localhost:8002',
            mountElementId: 'app-root',
          },
          {
            name: 'app2',
            routerBase: '#/app2',
            entry: 'http://localhost:8003',
            mountElementId: 'app-root',
          },
        ],
        jsSandbox: true,
        prefetch: true,
      },
    ],
  ],
};
