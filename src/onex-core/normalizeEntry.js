
export default function normalizeEntry(entry) {
  let hasEntry = false;
  if (!entry.scripts || !entry.scripts.length) {
    throw new Error('entry.scripts should not be empty.');
  }
  entry.scripts = (entry.scripts || []).map(asset => {
    if (asset.isEntry) {
      if (hasEntry) {
        throw new Error(`We should not have to entries.`);
      }
      hasEntry = true;
    }
    return normalizeAsset(asset);
  });
  if (!hasEntry) {
    entry.scripts[entry.scripts.length - 1].isEntry = true;
  }
  entry.styles = (entry.styles || []).map(normalizeAsset);
  return entry;
}

function normalizeAsset(asset) {
  return typeof asset === 'string' ? { src: asset } : asset;
}
