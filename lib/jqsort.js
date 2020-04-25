const args = require('./args');

function sort(list, property, descending) {
    return list.sort((a,b) => descending ?
        a[property] < b[property]
        : a[property] > b[property] );
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