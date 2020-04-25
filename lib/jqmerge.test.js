const sut = require('./jqmerge');


test('mergeObjects when receive objects should merge properties', () => {
    const objects = [
        {a: 'a'},
        {b: 'b'},
    ]

    const result = sut.mergeObjects(objects);

    expect(result).toEqual({a:'a', b: 'b'});
});