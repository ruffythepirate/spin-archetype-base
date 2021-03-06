#! /usr/bin/env node
const standardIn = require('./lib/standardIn');
const lib = require('./lib/jqsort');
const output = require('./lib/common/output-helper');

standardIn.withAllObjects((objects) => {
    args = lib.parseArguments();
    const result= lib.sort(objects, args.property, true);
    output.outputJson(result);
})
