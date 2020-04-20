const extractIngress = require('./extract-ingress');

test('extract ingress returns empty string if no ingress', () => {
    expect(extractIngress.extractIngress([])).toBe('');
});

test('extract lines between first and second heading if ingress', () => {
   const lines = [
       '# title',
       'ingress line 1',
       'ingress line 2',
       '## sub heading',
   ];
   const expectedString = [...lines].slice(1,3).join('\n');
   expect(extractIngress.extractIngress(lines)).toBe(expectedString);
});

test('extract maximum 400 characters, finish with ... if more', () => {
    const lines = [
        '# title',
        '1'.repeat(300),
        '2'.repeat(400),
        '## sub heading',
    ];
    const expectedString = [...lines].slice(1,3).join('\n').substring(0,400) + '...';
    expect(extractIngress.extractIngress(lines)).toBe(expectedString);
});
test('ingores leading \n', () => {
    const lines = [
        '# title',
        '',
        '',
        '## sub heading',
    ];
    expect(extractIngress.extractIngress(lines)).toBe('');
});
