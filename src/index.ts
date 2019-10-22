import { IApi } from 'umi-types';
import { GlobalOptions } from './types';
import master from './master';
import slave from './slave';

export default function(api: IApi, options: GlobalOptions) {
  api.addRuntimePluginKey('qiankun');

  // 监听插件配置变化
  api.onOptionChange((newOpts: GlobalOptions) => {
    const { master: masterOpts, slave: slaveOpts } = newOpts || {};
    api.changePluginOption('qiankun-master', { opts: masterOpts, needRegisterRuntimeKey: false });
    api.changePluginOption('qiankun-slave', { opts: slaveOpts, needRegisterRuntimeKey: false });
  });

  const { master: masterOpts, slave: slaveOpts } = options || {};

  api.registerPlugin({
    id: 'qiankun-master',
    apply: master,
    opts: { opts: masterOpts, needRegisterRuntimeKey: false },
  });

  api.registerPlugin({
    id: 'qiankun-slave',
    apply: slave,
    opts: { opts: slaveOpts, needRegisterRuntimeKey: false },
  });
}
