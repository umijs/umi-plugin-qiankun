/**
 * @author Kuitos
 * @since 2019-06-20
 */

import { LifeCycles } from 'qiankun';
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
};
