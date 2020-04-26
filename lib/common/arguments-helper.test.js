const sut = require('./arguments-helper');
const args = require('../args');
const environment = require('../environment');

jest.mock('../environment')
jest.mock('../args')


test('should return argument if available', () => {
    args.t = 'myValue'
    const value = sut.getArgumentOrEnvValue('t');
    expect(value).toBe(args.t)
});

test('should return environment variable if no argument', () => {
    args.t = undefined
    environment.ENV_T = 'envValue';
    const value = sut.getArgumentOrEnvValue('t', 'ENV_T');
    expect(value).toBe(environment.ENV_T)
});

test('should return argument if both argument and environment available', () => {
    args.t = 'argValue'
    environment.ENV_T = 'envValue';
    const value = sut.getArgumentOrEnvValue('t', 'ENV_T');
    expect(value).toBe(args.t)
});

test('getRequiredArgument when argument exist should return arg value', () => {
    args.t = undefined;
    args.title = 'hello'

    const result = sut.getRequiredArgument('t', 'title');

    expect(result).toBe(args.title);
});
