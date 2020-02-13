export const originSingleRoute = [
  {
    path: '/',
    exact: true,
    _title: 'app2',
    _title_default: 'app2',
  },
  {
    path: '/user',
    exact: true,
    _title: 'app2',
    _title_default: 'app2',
  },
  {
    _title: 'app2',
    _title_default: 'app2',
  },
];

export const expectCoverRoute = [
  {
    path: '/',
    exact: true,
    _title: 'app2',
    _title_default: 'app2',
  },
  {
    path: '/test/user',
    exact: true,
    _title: 'app2',
    _title_default: 'app2',
  },
  {
    _title: 'app2',
    _title_default: 'app2',
  },
];

export const originRoutes = [
  {
    path: '/',
    routes: [
      {
        path: '/',
        exact: true,
        _title: 'app2',
        _title_default: 'app2',
      },
      {
        path: '/user',
        exact: true,
        _title: 'app2',
        _title_default: 'app2',
      },
      {
        _title: 'app2',
        _title_default: 'app2',
      },
    ],
    _title: 'app2',
    _title_default: 'app2',
  },
  {
    _title: 'app2',
    _title_default: 'app2',
  },
];

export const expectRoutes = [
  {
    path: '/app2',
    routes: [
      {
        path: '/',
        exact: true,
        _title: 'app2',
        _title_default: 'app2',
      },
      {
        path: '/test/user',
        exact: true,
        _title: 'app2',
        _title_default: 'app2',
      },
      {
        _title: 'app2',
        _title_default: 'app2',
      },
    ],
    _title: 'app2',
    _title_default: 'app2',
  },
  {
    path: '/',
    routes: [
      {
        path: '/',
        exact: true,
        _title: 'app2',
        _title_default: 'app2',
      },
      {
        path: '/user',
        exact: true,
        _title: 'app2',
        _title_default: 'app2',
      },
      {
        _title: 'app2',
        _title_default: 'app2',
      },
    ],
    _title: 'app2',
    _title_default: 'app2',
  },
  {
    _title: 'app2',
    _title_default: 'app2',
  },
];
