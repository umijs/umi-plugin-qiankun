export default {
  plugins: [
    [
      '../../master',
      {
        apps: [
          {
            name: 'app1',
            entry: 'http://localhost:8002',
            base: '/app1',
            mountElementId: 'app-root',
          },
          {
            name: 'app2',
            entry: 'http://localhost:8003',
            base: '/app2',
            mountElementId: 'app-root',
          },
        ],
        jsSandbox: true,
        prefetch: true,
      },
    ],
  ],
};
