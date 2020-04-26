const args = require('../args');
const environment = require('../environment');


function getArgumentOrEnvValue(argumentName, environmentVariableName) {
    const returnValue = args[argumentName] || environment[environmentVariableName];
    return returnValue
}

function getRequiredArgument(...argumentNames) {
    const argumentName = argumentNames.find(name => args[name]);

    if(!argumentName) {
        throw `Could not find a value for required argument value in ${argumentNames}`;
    }
    return args[argumentName];
}

module.exports = {
    getArgumentOrEnvValue,
    getRequiredArgument
};