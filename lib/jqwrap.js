const args = require('./args');
const {tryParseAsJson} = require('./common/json-helper');


function parseArguments() {
    if(!args._) {
        throw 'invalid arguments'
    }
    return {
        property: args._[0]
    };
}

function wrapIntoProperty(argv, content) {
    const wrapper = {};

    wrapper[argv.property] = tryParseAsJson(content, content);
    return wrapper;
}

module.exports = {
    parseArguments,
    wrapIntoProperty
};