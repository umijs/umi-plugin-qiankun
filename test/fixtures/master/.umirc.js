
export default {
  plugins: [
    ['../../../master', {
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
    }],
  ],
}
