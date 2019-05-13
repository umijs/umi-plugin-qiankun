
export default {
  plugins: [
    ['../../../master', {
      apps: [
        {
          name: 'app1',
          routerPrefix: '/app1',
          entry: {
            scripts: [{ src: 'http://localhost:8002/umi.js' }],
            styles: [{ src: 'http://localhost:8002/umi.css' }],
          },
        },
        {
          name: 'app2',
          routerPrefix: '/app2',
          entry: {
            scripts: ['http://localhost:8003/umi.js'],
            styles: ['http://localhost:8003/umi.css'],
          },
        },
      ],
    }],
  ],
}
