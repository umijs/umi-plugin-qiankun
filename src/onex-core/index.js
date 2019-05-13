import * as singleSpa from 'single-spa';
import apps from '@tmp/singleSpaApps';
import loadEntry from './loadEntry';

export function bootstrap() {
  apps.forEach(app => {
    const { name, routerPrefix, entry } = app;
    function activityFunction(location) {
      return location.pathname.startsWith(routerPrefix);
    }
    singleSpa.registerApplication(
      name,
      async () => {
        const {
          bootstrap,
          mount,
          unmount,
        } = await loadEntry(entry);
        return {
          bootstrap: [...bootstrap],
          mount: [...mount],
          unmount: [...unmount],
        };
      },
      activityFunction,
    );
  });
  singleSpa.start();
}
