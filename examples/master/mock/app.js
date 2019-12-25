export default {
  'GET /api/apps': [
    {
      name: 'app1',
      entry: 'http://192.168.50.93:8001/app1',
      base: '/app1',
      mountElementId: 'root-subapp-container',
    },
    {
      name: 'app2',
      entry: 'http://192.168.50.93:8002/app2',
      base: '/app2',
      mountElementId: 'root-subapp-container',
      props: {
        testProp: 'test',
      },
    },
  ],
};
