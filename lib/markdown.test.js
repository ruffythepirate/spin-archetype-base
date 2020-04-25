const sut = require('./markdown');

test('renders markdown using markdown-it', () => {
    const rendered = '<h1>heading</h1>'
    const content = '# heading';
    expect(sut.render(content).trim()).toBe(rendered)
});