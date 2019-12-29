export default {
  target: 'node',
  cjs: { type: 'babel' },
  disableTypeCheck: true,
  runtimeHelpers: true,
  browserFiles: [
    'src/master/runtimePlugin.ts',
    'src/slave/lifecycles.ts',
    'src/slave/runtimePlugin.ts',
    'src/common.ts',
  ],
};
