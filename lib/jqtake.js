const args = require('./args');

function parseArguments() {
    return {
        number: parseInt(args._[0])
    }
}

module.exports = {
    parseArguments
};