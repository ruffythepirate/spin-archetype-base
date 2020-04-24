const argv = require('minimist')(process.argv.slice(2));

const argumentsCopy = {
    ...argv
}

module.exports = argumentsCopy;

