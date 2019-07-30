import * as app from '@tmp/umi';

if (!window.isMain) {
  setTimeout(() => {
    app.bootstrap().then(() => {
      app.mount();
    });
  }, 0);
}
