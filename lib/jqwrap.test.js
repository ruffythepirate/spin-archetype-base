const args = require('./args');

jest.mock('./args')

const sut = require('./jqwrap');

test('parseArguments when correct arguments should return property name', () => {
    const property = 'property';
    args._ = [property]

    const result = sut.parseArguments();

    expect(result.property).toBe(property);
});

test('parseArguments when invalid args should throw exception', () => {
    args._ = undefined;

    expect(sut.parseArguments).toThrow('invalid arguments');
});

test('wrapIntoProperty when content is string should wrap string into property', () => {
    const content = 'my string';

    const result = sut.wrapIntoProperty({property:'prop'}, content);

    expect(result).toEqual({prop:content});
});

test('wrapIntoProperty when content is object should content into object', () => {
    let value = {some:'content'};
    const content = JSON.stringify(value);

    const result = sut.wrapIntoProperty({property: 'property'}, content);

    expect(result).toEqual({property: value});
});
