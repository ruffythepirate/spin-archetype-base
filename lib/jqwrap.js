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

function formatOutput(object) {
    console.log(json.stringify(object, null, 2));
}

module.exports = {
    parseArguments,
    wrapIntoProperty,
    formatOutput
};