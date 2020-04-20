const foreach = require('./map-inline');

beforeEach(()=> {
    jest.clearAllMocks();
});

[
    {argv: [], errorReason: 'no shell command' },
    {argv: ['echo hello'], errorReason: 'no inline property defined' },
].forEach(
    (testData) => {
        test(`parseConfiguration throws error if ${testData.errorReason}`, () => {
            expect(() => {
                foreach.parseConfiguration( testData.argv );
            }).toThrow(Error);
        });
    }
);

[
    { argv: ['-p', '.hello', 'echo hello'], config: { command: 'echo hello', property: '.hello'} },
    { argv: ['--property', '.hello', 'echo hello'], config: { command: 'echo hello', property: '.hello'} },
]
    .forEach(testData => {
    test(`parseConfiguration parses ${testData.argv} as a valid config`, () => {
        const config = foreach.parseConfiguration(testData.argv)
        expect(config).toEqual(testData.config)
    });
});

test('replacePlaceholders replaces ${.hello}', () => {
    const replacedString = foreach.replacePlaceholders('string ${.input}',
        {input: 'hello'});

    expect(replacedString).toBe('string hello');
});

test('replacePlaceholders handles when nothing to replace'
    , () => {
        const replacedString = foreach.replacePlaceholders('string hello',
            {});
        expect(replacedString).toBe('string hello');
});
