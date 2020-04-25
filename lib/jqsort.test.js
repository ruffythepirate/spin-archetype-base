const sut = require('./jqsort');
const args = require('./args');

jest.mock('./args')

test('parseArguments when has property argument should parse it', () => {

    args._ = ['prop']

    const result = sut.parseArguments();

    expect(result.property).toBe('prop');
});

test('sort when has list should sort on defined property descending', () => {
    const list = [
        createItem('item', 1),
        createItem('item', 2),
        createItem('item', 3),
        createItem('item', 5),
        createItem('item', 4),
    ];

    const result = sut.sort(list, 'item', true);

    expect(result).toEqual(
        [
            createItem('item', 5),
            createItem('item', 4),
            createItem('item', 3),
            createItem('item', 2),
            createItem('item', 1),
        ]
    );
});

test('sort when has list should sort on defined property descending', () => {
    const list = [
        createItem('item', 1),
        createItem('item', 2),
        createItem('item', 3),
        createItem('item', 5),
        createItem('item', 4),
    ];

    const result = sut.sort(list, 'item', false);

    expect(result).toEqual(
        [
            createItem('item', 1),
            createItem('item', 2),
            createItem('item', 3),
            createItem('item', 4),
            createItem('item', 5),
        ]
    );
});
function createItem(prop, value) {
    return {
        [prop]: value
    };
}
