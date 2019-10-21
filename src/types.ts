/**
 * @author Kuitos
 * @since 2019-06-20
 */

import { LifeCycles } from 'qiankun';
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
};

export type MOptions = {
  opts: Options;
  needRegisterRuntimeKey: boolean;
};

export type GlobalOptions = {
  master: Options;
  slave: Options;
};
