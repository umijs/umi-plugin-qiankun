/**
 * @author Kuitos
 * @since 2019-06-20
 */

import { pathToRegexp } from 'path-to-regexp';

export const defaultMountContainerId = 'root-subapp';

// 主应用跟子应用的默认 root id 区分开，避免冲突
export const defaultMasterRootId = 'root-master';
export const defaultSlaveRootId = 'root-slave';

export const defaultHistoryMode = 'browser';

// @formatter:off
export const noop = () => {};
// @formatter:on

export function toArray<T>(source: T | T[]): T[] {
  return Array.isArray(source) ? source : [source];
}

export function testPathWithStaticPrefix(pathPrefix: string, realPath: string) {
  if (pathPrefix.endsWith('/')) {
    return realPath.startsWith(pathPrefix);
  }

  const pathRegex = new RegExp(`^${pathPrefix}(\\/|\\?)+.*$`, 'g');
  const normalizedPath = `${realPath}/`;
  return pathRegex.test(normalizedPath);
}

function testPathWithDynamicRoute(dynamicRoute: string, realPath: string) {
  return pathToRegexp(dynamicRoute).exec(realPath);
}

export function testPathWithPrefix(pathPrefix: string, realPath: string) {
  return testPathWithStaticPrefix(pathPrefix, realPath) || testPathWithDynamicRoute(pathPrefix, realPath);
}
