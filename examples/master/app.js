//import './global.css'

window.isMain = true;
export const qiankun = new Promise(resolve => {
  setTimeout(() => {
    resolve({
      apps: [
        {
          name: 'app1',
          entry: 'http://localhost:8001/app1',
          base: '/app1',
          mountElementId: 'root-slave',
        },
        {
          name: 'app2',
          entry: 'http://localhost:8002/app2',
          base: '/app2',
          mountElementId: 'root-slave',
        },
      ],
    });
  }, 1000);
});
