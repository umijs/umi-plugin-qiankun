// 标识位，方便子应用单独调试
window.isMain = true;

// 异步demo
export const qiankun = new Promise(resolve => {
  setTimeout(() => {
    window.g_app._store
      .dispatch({
        type: 'base/getApps',
      })
      .then(apps => {
        resolve({
          apps,
        });
      });
  }, 0);
});

// 同步demo
// export const qiankun = {
//   apps: [
//     {
//       name: 'app1',
//       entry: 'http://localhost:8001/app1',
//       base: '/app1',
//       mountElementId: 'root-slave',
//     },
//     {
//       name: 'app2',
//       entry: 'http://localhost:8002/app2',
//       base: '/app2',
//       mountElementId: 'root-slave',
//     },
//   ],
// }
