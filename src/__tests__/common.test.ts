/**
 * @author Kuitos
 * @since 2019-10-22
 */

import { addSpecifyPrefixedRoute, testPathWithPrefix } from '../common';
import { expectRoutes, originRoutes } from './mock';

it('testPathPrefix', () => {
  // browser history
  expect(testPathWithPrefix('/js', '/')).toBeFalsy();

  expect(testPathWithPrefix('/js', '/js')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/jss')).toBeFalsy();
  expect(testPathWithPrefix('/js', '/js/')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/js/s')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/js/s/a')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/js/s?a=b')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/js?a=b')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/js?')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/js/?')).toBeTruthy();
  expect(testPathWithPrefix('/js', '/js/?a=b')).toBeTruthy();

  // hash history
  expect(testPathWithPrefix('#/js', '#/js')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/jss')).toBeFalsy();
  expect(testPathWithPrefix('#/js', '#/js/')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/js/s')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/js/s/a')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/js/s?a=b')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/js?a=b')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/js?')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/js/?')).toBeTruthy();
  expect(testPathWithPrefix('#/js', '#/js/?a=b')).toBeTruthy();

  // browser history with slash ending
  expect(testPathWithPrefix('/js/', '/js')).toBeFalsy();
  expect(testPathWithPrefix('/js/', '/jss')).toBeFalsy();
  expect(testPathWithPrefix('/js/', '/js/')).toBeTruthy();
  expect(testPathWithPrefix('/js/', '/js/s')).toBeTruthy();
  expect(testPathWithPrefix('/js/', '/js/s/a')).toBeTruthy();
  expect(testPathWithPrefix('/js/', '/js/s?a=b')).toBeTruthy();
  expect(testPathWithPrefix('/js/', '/js?a=b')).toBeFalsy();
  expect(testPathWithPrefix('/js/', '/js?')).toBeFalsy();
  expect(testPathWithPrefix('/js/', '/js/?')).toBeTruthy();
  expect(testPathWithPrefix('/js/', '/js/?a=b')).toBeTruthy();

  // hash history with slash ending
  expect(testPathWithPrefix('#/js/', '#/js')).toBeFalsy();
  expect(testPathWithPrefix('#/js/', '#/jss')).toBeFalsy();
  expect(testPathWithPrefix('#/js/', '#/js/')).toBeTruthy();
  expect(testPathWithPrefix('#/js/', '#/js/s')).toBeTruthy();
  expect(testPathWithPrefix('#/js/', '#/js/s/a')).toBeTruthy();
  expect(testPathWithPrefix('#/js/', '#/js/s?a=b')).toBeTruthy();
  expect(testPathWithPrefix('#/js/', '#/js?a=b')).toBeFalsy();
  expect(testPathWithPrefix('#/js/', '#/js?')).toBeFalsy();
  expect(testPathWithPrefix('#/js/', '#/js/?')).toBeTruthy();
  expect(testPathWithPrefix('#/js/', '#/js/?a=b')).toBeTruthy();

  // browser history with dynamic route
  expect(testPathWithPrefix('/:abc', '/js')).toBeTruthy();
  expect(testPathWithPrefix('/:abc', '/123')).toBeTruthy();
  expect(testPathWithPrefix('/:abc/', '/js/')).toBeTruthy();
  expect(testPathWithPrefix('/:abc/js', '/js/js')).toBeTruthy();
  expect(testPathWithPrefix('/:abc/js', '/js/123')).toBeFalsy();
  expect(testPathWithPrefix('/js/:abc', '/js/123')).toBeTruthy();
  expect(testPathWithPrefix('/js/:abc/', '/js/123')).toBeFalsy();
  expect(testPathWithPrefix('/js/:abc/jsx', '/js/123/jsx')).toBeTruthy();
  expect(testPathWithPrefix('/js/:abc/jsx', '/js/123/jsx/hello')).toBeTruthy();
  expect(testPathWithPrefix('/js/:abc/jsx', '/js/123')).toBeFalsy();
  expect(testPathWithPrefix('/js/:abc/jsx', '/js/123/css')).toBeFalsy();
  expect(testPathWithPrefix('/js/:abc/jsx/:cde', '/js/123/jsx/kkk')).toBeTruthy();
  expect(testPathWithPrefix('/js/:abc/jsx/:cde', '/js/123/jsk')).toBeFalsy();
  expect(testPathWithPrefix('/js/:abc/jsx/:cde', '/js/123/jsx/kkk/hello')).toBeTruthy();
  expect(testPathWithPrefix('/js/:abc?', '/js')).toBeTruthy();
  expect(testPathWithPrefix('/js/*', '/js/245')).toBeTruthy();

  // hash history with dynamic route
  expect(testPathWithPrefix('#/:abc', '#/js')).toBeTruthy();
  expect(testPathWithPrefix('#/:abc', '#/123')).toBeTruthy();
  expect(testPathWithPrefix('#/:abc/', '#/js/')).toBeTruthy();
  expect(testPathWithPrefix('#/:abc/js', '#/js/js')).toBeTruthy();
  expect(testPathWithPrefix('#/:abc/js', '#/js/123')).toBeFalsy();
  expect(testPathWithPrefix('#/js/:abc', '#/js/123')).toBeTruthy();
  expect(testPathWithPrefix('#/js/:abc/', '#/js/123')).toBeFalsy();
  expect(testPathWithPrefix('#/js/:abc/', '#/js/123/jsx')).toBeTruthy();
  expect(testPathWithPrefix('#/js/:abc/jsx', '#/js/123/jsx')).toBeTruthy();
  expect(testPathWithPrefix('#/js/:abc/jsx', '#/js/123/jsx/hello')).toBeTruthy();
  expect(testPathWithPrefix('#/js/:abc/jsx', '#/js/123/jsx/hello?test=1')).toBeTruthy();
  expect(testPathWithPrefix('#/js/:abc/jsx', '#/js/123')).toBeFalsy();
  expect(testPathWithPrefix('#/js/:abc/jsx', '#/js/123/css')).toBeFalsy();
  expect(testPathWithPrefix('#/js/:abc/jsx/:cde', '#/js/123/jsx/kkk')).toBeTruthy();
  expect(testPathWithPrefix('#/js/:abc/jsx/:cde', '#/js/123/jsx/kkk/hello')).toBeTruthy();
  expect(testPathWithPrefix('#/js/:abc/jsx/:cde', '#/js/123/jsk')).toBeFalsy();
  expect(testPathWithPrefix('#/js/:abc?', '#/js')).toBeTruthy();
  expect(testPathWithPrefix('#/js/*', '#/js/245')).toBeTruthy();
});

it('testRecursiveCoverRouter', () => {
  // 在原route的基础上添加指定路由单测
  expect(String(addSpecifyPrefixedRoute(originRoutes, 'test'))).toEqual(String(expectRoutes));
  expect(String(addSpecifyPrefixedRoute(originRoutes, 'test', 'app2'))).toEqual(String(expectRoutes));
  expect(String(addSpecifyPrefixedRoute(originRoutes, true, 'test'))).toEqual(String(expectRoutes));
});
