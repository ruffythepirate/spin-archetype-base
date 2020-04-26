const args = require('./args');

function sort(list, property, descending) {
    return list.sort((a,b) => a[property] < b[property] === descending? 1 : -1 );
}

function parseArguments() {
    return {
        property: args._[0]
    };
}

module.exports = {
    sort,
    parseArguments
};