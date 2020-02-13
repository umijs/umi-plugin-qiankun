/**
 * @author Kuitos
 * @since 2019-06-20
 */

import pathToRegexp from 'path-to-regexp';
import { IRoute } from 'umi-types';
import { cloneDeep } from 'lodash';

import { keepOriginalRoutesOption } from './types';

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

function testPathWithStaticPrefix(pathPrefix: string, realPath: string) {
  if (pathPrefix.endsWith('/')) {
    return realPath.startsWith(pathPrefix);
  }

  const pathRegex = new RegExp(`^${pathPrefix}(\\/|\\?)+.*$`, 'g');
  const normalizedPath = `${realPath}/`;
  return pathRegex.test(normalizedPath);
}

function testPathWithDynamicRoute(dynamicRoute: string, realPath: string) {
  return !!pathToRegexp(dynamicRoute, { strict: true }).exec(realPath);
}

export function testPathWithPrefix(pathPrefix: string, realPath: string) {
  return testPathWithStaticPrefix(pathPrefix, realPath) || testPathWithDynamicRoute(pathPrefix, realPath);
}

export const recursiveCoverRouter = (_source: Array<IRoute>, _nameSpacePath: string) =>
  _source.map((router: IRoute) => {
    if (router.routes) {
      recursiveCoverRouter(router.routes, _nameSpacePath);
    }
    if (router.path !== '/' && router.path) {
      return {
        ...router,
        path: `${_nameSpacePath}${router.path}`,
      };
    }
    return router;
  });

export const addSpecifyPrefixedRoute = (
  originRoute: Array<IRoute>,
  keepOriginalRoutes: keepOriginalRoutesOption,
  pkgName?: string,
) => {
  const copyBase = originRoute.filter(_ => _.path === '/');
  if (!copyBase[0]) {
    return originRoute;
  }

  const nameSpaceRouter: any = cloneDeep(copyBase[0]);
  const nameSpace = keepOriginalRoutes === true ? pkgName : keepOriginalRoutes;

  nameSpaceRouter.path = `/${nameSpace}`;
  nameSpaceRouter.routes = recursiveCoverRouter(nameSpaceRouter.routes, `/${nameSpace}`);

  return [nameSpaceRouter, ...originRoute];
};
