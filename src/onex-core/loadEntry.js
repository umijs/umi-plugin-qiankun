import { noteGlobalProps, getGlobalProp } from 'import-html-entry/esm/utils';
import normalizeEntry from './normalizeEntry';
import fetchEntry from './fetchEntry';

// avoid scope problem
const geval = eval;

export default async function(rawEntry) {
  const entry = normalizeEntry(rawEntry);
  await fetchEntry(entry);

  // load stylesheets
  const el = document.createElement('style');
  el.innerHTML = entry.styles.map(style => style.content).join('\n\n');

  // execute scripts
  let exports = {};
  entry.scripts.forEach((script) => {
    if (script.isEntry) {
      noteGlobalProps();
    }
    try {
      geval(`;(function(window){;${script.content}\n})(window);`);
    } catch (e) {
      console.error(`error occurs while executing the entry ${script.src}`);
      console.error(e);
    }
    if (script.isEntry) {
      exports = window[getGlobalProp()] || {};
    }
  });

  return {
    bootstrap: [
      exports.bootstrap,
    ],
    mount: [
      // load styles
      async () => {
        document.getElementsByTagName('head')[0].appendChild(el);
      },
      exports.mount,
    ],
    unmount: [
      exports.unmount,
      // unload styles
      async () => {
        el.parentNode.removeChild(el);
      },
    ],
  };
}
