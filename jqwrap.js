#! /usr/bin/env node
const standardIn = require('./lib/standardIn');
const lib = require('./lib/jqwrap');

standardIn.withAllRead((content) => {
    const args = lib.parseArguments();

    const result = lib.wrapIntoProperty(args, content);

    lib.formatOutput(result);
})

