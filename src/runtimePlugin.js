export function render(oldRender) {
  oldRender();
  singleSpa.start();
}
