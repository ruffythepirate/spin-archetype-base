const sut = require('./markdown');

test('renders markdown using markdown-it', () => {
    const rendered = '<h1>heading</h1>'
    const content = '# heading';
    expect(sut.render(content).trim()).toBe(rendered)
});

test('render when parsing code should add language based styling for javascript', () => {
    const javascriptCode =
        createCode('javascript', 'const i = 0;')

    const result = sut.render(javascriptCode);

    expect(result).toMatch(wrappedWithSpan('const', 'hljs-keyword'));
    expect(result).toMatch(wrappedWithSpan('0', 'hljs-number'));
});

test('render when unknown language should throw error', () => {
    const javascriptCode =
        createCode('unknown', 'const i = 0;')

    expect(() => {sut.render(javascriptCode)}).toThrow();
});

[
    'rust',
    'scala',
    'bash',
    'javascript',
]
    .forEach((lang) => {
        test(`render when language ${lang} should not throw`, () => {
            const code =
                createCode(lang, 'const i = 0;')

            const result = sut.render(code);
        });
    })

function wrappedWithSpan(word, className) {
    return new RegExp(`<span class="${className}">${word}</span>`);
}

function createCode(language, content) {
   return `\`\`\`${language}
   ${content}
   \`\`\`
   `
}