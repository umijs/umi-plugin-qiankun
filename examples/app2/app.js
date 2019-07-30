import * as app from '@tmp/umi';

setTimeout(() => {
  app.bootstrap().then(() => {
    app.mount();
  });
}, 0);
