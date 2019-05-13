import { noteGlobalProps, getGlobalProp } from 'import-html-entry/esm/utils';
import normalizeEntry from './normalizeEntry';
import fetchEntry from './fetchEntry';

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
      async () => {
        if (el) {
          document.getElementsByTagName('head')[0].appendChild(el);
        }
      },
      exports.mount,
    ],
    unmount: [
      exports.unmount,
      async () => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      },
    ],
  };
}
