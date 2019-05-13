
export function render(oldRender) {
  oldRender();
  require('../../onex-core').bootstrap();
}
