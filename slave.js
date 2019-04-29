module.exports = function(api, options = {}) {
  const lifecyclePath = require.resolve('./es/lifecycles');
  const mountElementId = 'slave-root';
  const { base } = options;

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      history: 'hash',
    };
  });

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      mountElementId,
    };
  });

  api.addEntryImport({
    source: lifecyclePath,
    specifier:
      '{ genMount as singleSPA_genMount, genBootstrap as singleSPA_genBootstrap, genUnmount as singleSPA_genUnmount }',
  });

  api.addRendererWrapperWithModule(lifecyclePath);

  api.addEntryCode(
    `
    const bootstrap = singleSPA_genBootstrap(Promise.all(moduleBeforeRendererPromises), render);
    const mount = singleSPA_genMount();
    const unmount = singleSPA_genUnmount('${mountElementId}');

    singleSpa.registerApplication('${base.slice(
      1,
    )}', () => Promise.resolve({ bootstrap, mount, unmount }), location => location.pathname.startsWith('${base}'));
    `,
  );
};
