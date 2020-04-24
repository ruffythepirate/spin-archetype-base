const args = require('./args');
const environment = require('./environment');


function getArgumentValue(argumentName, environmentVariableName) {
    const returnValue = args[argumentName] || environment[environmentVariableName];
    return returnValue
}

module.exports = {
    getArgumentValue
};