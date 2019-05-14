import ReactDOM from 'react-dom';

const defer = {};
defer.promise = new Promise(resolve => {
  defer.resolve = resolve;
});

let render = null;
let hasMountedAtLeastOnce = false;

export default () => defer.promise;

function getRuntimeSingleSpa() {
  const plugins = require('umi/_runtimePlugin');
  return plugins.mergeConfig('singleSpa');
}

export function genBootstrap(promises, oldRender) {
  return () => {
    return new Promise(resolve => {
      const runtimeSingleSpa = getRuntimeSingleSpa();
      if (runtimeSingleSpa.bootstrap) runtimeSingleSpa.bootstrap();
      render = () => {
        return promises.then(oldRender).catch(e => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Render failed', e);
          }
        });
      };
      resolve();
    });
  };
}

export function genMount() {
  return () => {
    return Promise.resolve().then(() => {
      defer.resolve();
      const runtimeSingleSpa = getRuntimeSingleSpa();
      if (runtimeSingleSpa.mount) runtimeSingleSpa.mount();
      // 第一次 mount umi 会自动触发 render，非第一次 mount 则需手动触发
      if (hasMountedAtLeastOnce) {
        render();
      }
      hasMountedAtLeastOnce = true;
    });
  };
}

export function genUnmount(mountElementId) {
  return () => {
    return Promise.resolve().then(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById(mountElementId));
      const runtimeSingleSpa = getRuntimeSingleSpa();
      if (runtimeSingleSpa.unmount) runtimeSingleSpa.unmount();
    });
  };
}
