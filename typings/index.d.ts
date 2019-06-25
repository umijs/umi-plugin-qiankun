/**
 * @author Kuitos
 * @since 2019-06-20
 */

declare module '@tmp/microApps.json' {
  type Apps = {
    name: string;
    entry: string | { scripts: string[], styles: string[] };
    routerBase: string;
  };

  const apps: Apps[];
  export default apps;
}

declare module '@tmp/qiankunRootExports.js';
