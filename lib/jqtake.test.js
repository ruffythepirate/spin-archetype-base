const sut = require('./jqtake');
const args = require('./args');

jest.mock('./args')

test('parseArguments when has number should return number as property', () => {

    args._ = ['5']

    const result = sut.parseArguments();

    expect(result.number).toEqual(5);
});
