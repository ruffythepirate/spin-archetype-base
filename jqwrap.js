#! /usr/bin/env node
const standardIn = require('./lib/standardIn');
const lib = require('./lib/jqwrap');
const output = require('./lib/common/output-helper');


standardIn.withAllRead((content) => {
    const args = lib.parseArguments();

    const result = lib.wrapIntoProperty(args, content);

    output.outputJson(result)
})

