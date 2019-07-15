import React from 'react';

export function rootContainer(container: HTMLElement) {
  let value = (window as any).g_rootExports;
  const { Context } = require('@tmp/qiankunContext');
  return React.createElement(Context.Provider, { value }, container);
}
