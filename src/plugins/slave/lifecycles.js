import ReactDOM from 'react-dom';

const defer = {};
defer.promise = new Promise(resolve => {
  defer.resolve = resolve;
});

let render = null;

export default () => defer.promise;

export function genBootstrap(promises, oldRender) {
  return () => {
    return new Promise(resolve => {
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
      render();
    });
  };
}

export function genUnmount(mountElementId) {
  return () => {
    return Promise.resolve().then(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById(mountElementId));
    });
  };
}
