import { IApi } from 'umi-types';
import assert from 'assert';
import { GlobalOptions } from './types';
import master from './master';
import slave from './slave';

export default function(api: IApi, options: GlobalOptions) {
  api.addRuntimePluginKey('qiankun');

  // 监听插件配置变化
  api.onOptionChange((newOpts: GlobalOptions) => {
    const { master: masterOpts, slave: slaveOpts } = newOpts || {};
    assert(!(masterOpts && slaveOpts), '请勿同时配置 master 和 slave 配置项');
    if (masterOpts) {
      api.changePluginOption('qiankun-master', { opts: masterOpts, needRegisterRuntimeKey: false });
    } else if (slaveOpts) {
      api.changePluginOption('qiankun-slave', { opts: slaveOpts, needRegisterRuntimeKey: false });
    }
  });

  const { master: masterOpts, slave: slaveOpts } = options || {};

  assert(!(masterOpts && slaveOpts), '请勿同时配置 master 和 slave 配置项');

  if (masterOpts) {
    api.registerPlugin({
      id: 'qiankun-master',
      apply: master,
      opts: { opts: masterOpts, needRegisterRuntimeKey: false },
    });
  } else if (slaveOpts) {
    api.registerPlugin({
      id: 'qiankun-slave',
      apply: slave,
      opts: { opts: slaveOpts, needRegisterRuntimeKey: false },
    });
  }
}
