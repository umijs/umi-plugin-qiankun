
export default async function fetchEntry(entry) {
  const assets = [
    ...entry.scripts,
    ...entry.styles,
  ];
  return Promise.all(assets.map(async asset => {
    const url = asset.src;
    const res = await fetch(url);
    asset.content = await res.text();
  }));
}
