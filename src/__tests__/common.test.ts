/**
 * @author Kuitos
 * @since 2019-10-22
 */

import { addSpecifyPrefixedRoute, getMatchedPathWithPrefix } from '../common';
import { expectRoutes, originRoutes } from './mock';

it('testPathPrefix', () => {
  // browser history
  expect(getMatchedPathWithPrefix('/js', '/')).toBeNull();

  expect(getMatchedPathWithPrefix('/js', '/js')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/jss')).toBeNull();
  expect(getMatchedPathWithPrefix('/js', '/js/')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/js/s')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/js/s/a')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/js/s?a=b')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/js?a=b')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/js?')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/js/?')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js', '/js/?a=b')).toBe('/js');

  // hash history
  expect(getMatchedPathWithPrefix('#/js', '#/js')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/jss')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js', '#/js/')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/js/s')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/js/s/a')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/js/s?a=b')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/js?a=b')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/js?')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/js/?')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js', '#/js/?a=b')).toBe('#/js');

  // browser history with slash ending
  expect(getMatchedPathWithPrefix('/js/', '/js')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/', '/jss')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/', '/js/')).toBe('/js/');
  expect(getMatchedPathWithPrefix('/js/', '/js/s')).toBe('/js/');
  expect(getMatchedPathWithPrefix('/js/', '/js/s/a')).toBe('/js/');
  expect(getMatchedPathWithPrefix('/js/', '/js/s?a=b')).toBe('/js/');
  expect(getMatchedPathWithPrefix('/js/', '/js?a=b')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/', '/js?')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/', '/js/?')).toBe('/js/');
  expect(getMatchedPathWithPrefix('/js/', '/js/?a=b')).toBe('/js/');

  // hash history with slash ending
  expect(getMatchedPathWithPrefix('#/js/', '#/js')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/', '#/jss')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/', '#/js/')).toBe('#/js/');
  expect(getMatchedPathWithPrefix('#/js/', '#/js/s')).toBe('#/js/');
  expect(getMatchedPathWithPrefix('#/js/', '#/js/s/a')).toBe('#/js/');
  expect(getMatchedPathWithPrefix('#/js/', '#/js/s?a=b')).toBe('#/js/');
  expect(getMatchedPathWithPrefix('#/js/', '#/js?a=b')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/', '#/js?')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/', '#/js/?')).toBe('#/js/');
  expect(getMatchedPathWithPrefix('#/js/', '#/js/?a=b')).toBe('#/js/');

  // browser history with dynamic route
  expect(getMatchedPathWithPrefix('/:abc', '/js')).toBe('/js');
  expect(getMatchedPathWithPrefix('/:abc', '/123')).toBe('/123');
  expect(getMatchedPathWithPrefix('/:abc/', '/js/')).toBe('/js/');
  expect(getMatchedPathWithPrefix('/:abc/js', '/js/js')).toBe('/js/js');
  expect(getMatchedPathWithPrefix('/:abc/js', '/js/123')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/:abc', '/js/123')).toBe('/js/123');
  expect(getMatchedPathWithPrefix('/js/:abc/', '/js/123')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/:abc/jsx', '/js/123/jsx')).toBe('/js/123/jsx');
  expect(getMatchedPathWithPrefix('/js/:abc/jsx', '/js/123/jsx/hello')).toBe('/js/123/jsx');
  expect(getMatchedPathWithPrefix('/js/:abc/jsx', '/js/123')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/:abc/jsx', '/js/123/css')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/:abc/jsx/:cde', '/js/123/jsx/kkk')).toBe('/js/123/jsx/kkk');
  expect(getMatchedPathWithPrefix('/js/:abc/jsx/:cde', '/js/123/jsk')).toBeNull();
  expect(getMatchedPathWithPrefix('/js/:abc/jsx/:cde', '/js/123/jsx/kkk/hello')).toBe('/js/123/jsx/kkk');
  expect(getMatchedPathWithPrefix('/js/:abc?', '/js')).toBe('/js');
  expect(getMatchedPathWithPrefix('/js/*', '/js/245')).toBe('/js/245');

  // hash history with dynamic route
  expect(getMatchedPathWithPrefix('#/:abc', '#/js')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/:abc', '#/123')).toBe('#/123');
  expect(getMatchedPathWithPrefix('#/:abc/', '#/js/')).toBe('#/js/');
  expect(getMatchedPathWithPrefix('#/:abc/js', '#/js/js')).toBe('#/js/js');
  expect(getMatchedPathWithPrefix('#/:abc/js', '#/js/123')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/:abc', '#/js/123')).toBe('#/js/123');
  expect(getMatchedPathWithPrefix('#/js/:abc/', '#/js/123')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/:abc/', '#/js/123/jsx')).toBe('#/js/123/');
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx', '#/js/123/jsx')).toBe('#/js/123/jsx');
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx', '#/js/123/jsx/hello')).toBe('#/js/123/jsx');
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx', '#/js/123/jsx/hello?test=1')).toBe('#/js/123/jsx');
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx', '#/js/123')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx', '#/js/123/css')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx/:cde', '#/js/123/jsx/kkk')).toBe('#/js/123/jsx/kkk');
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx/:cde', '#/js/123/jsx/kkk/hello')).toBe('#/js/123/jsx/kkk');
  expect(getMatchedPathWithPrefix('#/js/:abc/jsx/:cde', '#/js/123/jsk')).toBeNull();
  expect(getMatchedPathWithPrefix('#/js/:abc?', '#/js')).toBe('#/js');
  expect(getMatchedPathWithPrefix('#/js/*', '#/js/245')).toBe('#/js/245');
});

it('testRecursiveCoverRouter', () => {
  // 在原route的基础上添加指定路由单测
  expect(String(addSpecifyPrefixedRoute(originRoutes, 'test'))).toEqual(String(expectRoutes));
  expect(String(addSpecifyPrefixedRoute(originRoutes, 'test', 'app2'))).toEqual(String(expectRoutes));
  expect(String(addSpecifyPrefixedRoute(originRoutes, true, 'test'))).toEqual(String(expectRoutes));
});
