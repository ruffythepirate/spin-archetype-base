#! /usr/bin/env node
const standardIn = require('./lib/standardIn');
const jqtake = require('./lib/jqtake');
const output = require('./lib/common/output-helper');

standardIn.withAllObjects((objects) => {
    args = jqtake.parseArguments();

    objects = objects.splice(0, args.number);

    output.outputJson(objects);
});
