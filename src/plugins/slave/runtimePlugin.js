import React from 'react';

export function rootContainer(container) {
  let value = window.g_rootExports;
  const { Context } = require('@tmp/singleSpaContext');
  return React.createElement(
    Context.Provider,
    { value },
    container,
  );
}
