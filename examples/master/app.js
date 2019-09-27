// 标识位，方便子应用单独调试
import request from './services/request';

window.isMain = true;

export const qiankun = request('/apps').then(apps => ({ apps }));
