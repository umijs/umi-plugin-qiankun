import React from 'react';

export function rootContainer(container: HTMLElement) {
  const value = (window as any).g_rootExports;
  // eslint-disable-next-line global-require
  const { Context } = require('@tmp/qiankunContext');
  return React.createElement(Context.Provider, { value }, container);
}
