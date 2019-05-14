import normalizeEntry from './normalizeEntry';

test('scripts', () => {
  expect(normalizeEntry({
    scripts: ['a.js', { src: 'b.js' }, { content: 'alert(1);' }]
  })).toEqual({
    scripts:
      [
        { src: 'a.js' },
        { src: 'b.js' },
        { content: 'alert(1);', isEntry: true },
      ],
    styles: [],
  });
});

test('with isEntry script', () => {
  expect(normalizeEntry({
    scripts: [{ src: 'a.js', isEntry: true }, { src: 'b.js' }]
  })).toEqual({
    scripts:
      [
        { src: 'a.js', isEntry: true },
        { src: 'b.js' },
      ],
    styles: [],
  });
});

test('throw Error if no scripts supplied', () => {
  expect(() => {
    normalizeEntry({});
  }).toThrow(/entry.scripts should not be empty./)
});

test('styles', () => {
  expect(normalizeEntry({
    scripts: ['a.js'],
    styles: ['a.css', { src: 'b.css' }, { content: 'body { color:red }' }]
  })).toEqual({
    scripts: [{ src: 'a.js', isEntry: true }],
    styles: [
      { src: 'a.css' },
      { src: 'b.css' },
      { content: 'body { color:red }' },
    ],
  });
});

