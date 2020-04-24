
const markdownItFactory = require('markdown-it');
const {when} = require('jest-when')
jest.mock('markdown-it');
const mdRender = jest.fn();
markdownItFactory.mockReturnValue({render: mdRender})

const sut = require('./markdown');

test('renders markdown using markdown-it', () => {
    const rendered = 'rendered'
    const content = 'cont';
    when(mdRender).calledWith(content).mockReturnValue(rendered);

    expect(sut.render(content)).toBe(rendered)
});