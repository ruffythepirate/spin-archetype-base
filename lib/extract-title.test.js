const extractTitle = require('./extract-title');

test('returns undefined if no title found', () => {
    expect(extractTitle.extractTitleFromLine('no title')).toBe(undefined);
});

test('returns title if line starts with #', () => {
    const title = 'This is a long but very nice title!'
    expect(extractTitle.extractTitleFromLine(`# ${title}`)).toBe(title);
});