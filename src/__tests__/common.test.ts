/**
 * @author Kuitos
 * @since 2019-10-22
 */

import { testPathWithPrefix } from '../common';

it('testPathPrefix', () => {
  // browser history
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
});
