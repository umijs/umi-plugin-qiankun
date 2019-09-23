/**
 * @author Kuitos
 * @since 2019-06-20
 */

import IConfig from 'umi-types/config';
import { LifeCycles } from 'qiankun';

export type App = {
  name: string;
  entry: string | { scripts: string[], styles: string[] };
  base: string | string[];
} & Pick<IConfig, 'history' | 'mountElementId'>;

export type Options = {
  apps: App[];
  jsSandbox: boolean;
  prefetch: boolean;
  lifeCycles?: LifeCycles<object>;
};
