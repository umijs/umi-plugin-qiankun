module.exports = function(api, options = {}) {
  api.addRuntimePlugin(require.resolve('./es/runtimePlugin'));

  api.addHTMLHeadScript([
    {
      src: 'https://unpkg.com/single-spa@4.3.2/lib/umd/single-spa.min.js',
    },
  ]);

  (options.slaves || []).forEach(slave => {
    const { scripts, styles } = slave;
    api.addHTMLHeadScript(
      scripts.map(src => ({
        src,
      })),
    );
    api.addHTMLLink(
      styles.map(href => ({
        rel: 'stylesheet',
        href,
      })),
    );
  });
};
