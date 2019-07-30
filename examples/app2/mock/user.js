import mockjs from 'mockjs';

export default {
  'GET /api/app1/users': mockjs.mock({
    'data|100': [
      {
        'id|+1': 1,
        name: '@cname',
        email: '@email',
      },
    ],
  }),
};
