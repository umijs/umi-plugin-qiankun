import '@tmp/singleSpaRootExports';
import apps from '@tmp/singleSpaApps';

export function render(oldRender) {
  oldRender();
  require('../../onex-core').bootstrap(apps);
}
