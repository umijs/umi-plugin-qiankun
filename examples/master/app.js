import request from './services/request';

export const qiankun = request('/apps').then(apps => ({ apps }));
