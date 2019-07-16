/**
 * @author Kuitos
 * @since 2019-06-20
 */

declare module '@tmp/subAppsConfig.json' {
  type App = {
    name: string;
    entry: string | { scripts: string[], styles: string[] };
    routerBase: string;
    mountElementId: string;
  };

  const configuration: {
    apps: App[];
    jsSandbox: boolean;
    prefetch: boolean;
  };
  export default configuration;
}

declare module '@tmp/qiankunRootExports.js';
