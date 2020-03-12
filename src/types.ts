/**
 * @author Kuitos
 * @since 2019-06-20
 */

import { LifeCycles, StartOpts } from 'qiankun';
// eslint-disable-next-line import/no-unresolved
import { IConfig } from 'umi-types';

export type App = {
  name: string;
  entry: string | { scripts: string[]; styles: string[] };
  base: string | string[];
  props?: any;
} & Pick<IConfig, 'history' | 'mountElementId'>;

export type Options = {
  apps: App[];
  jsSandbox: boolean;
  prefetch: boolean;
  defer?: boolean;
  lifeCycles?: LifeCycles<object>;
  masterHistory: IConfig['history'];
  registerRuntimeKeyInIndex?: boolean; // 仅做插件本身透传用，开发者无需关心
  keepOriginalRoutes?: boolean | string;
} & StartOpts;

export type keepOriginalRoutesOption = boolean | string;

export type GlobalOptions = {
  master?: Options;
  slave?: Options;
};
