import request from './request';

export async function query() {
  return request('/apps');
}
