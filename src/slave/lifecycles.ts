// @ts-ignore
import ReactDOM from 'react-dom';
import { noop } from '../common';

type Defer = {
  promise: Promise<any>;
  resolve(value?: any): void;
};

// @ts-ignore
const defer: Defer = {};
defer.promise = new Promise(resolve => {
  defer.resolve = resolve;
});

let render = noop;
let hasMountedAtLeastOnce = false;

export default () => defer.promise;

function getSlaveRuntime() {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const plugins = require('umi/_runtimePlugin');
  const config = plugins.mergeConfig('qiankun') || {};
  const { slave } = config;
  return slave || config;
}

export function genBootstrap(promises: Promise<any>, oldRender: typeof noop) {
  return async (...args: any[]) => {
    const slaveRuntime = getSlaveRuntime();
    if (slaveRuntime.bootstrap) await slaveRuntime.bootstrap(...args);
    render = () =>
      promises.then(oldRender).catch(e => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Render failed', e);
        }
      });
  };
}

export function genMount() {
  return async (...args: any[]) => {
    defer.resolve();
    const slaveRuntime = getSlaveRuntime();
    if (slaveRuntime.mount) await slaveRuntime.mount(...args);
    // 第一次 mount umi 会自动触发 render，非第一次 mount 则需手动触发
    if (hasMountedAtLeastOnce) {
      render();
    }
    hasMountedAtLeastOnce = true;
  };
}

export function genUnmount(mountElementId: string) {
  return async (...args: any[]) => {
    const container = document.getElementById(mountElementId);
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
    const slaveRuntime = getSlaveRuntime();
    if (slaveRuntime.unmount) await slaveRuntime.unmount(...args);
  };
}
