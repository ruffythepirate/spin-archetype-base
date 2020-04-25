#! /usr/bin/env node

const standardIn = require('./lib/standardIn');
const jqmerge = require('./lib/jqmerge');
const output = require('./lib/common/output-helper');


standardIn.withAllObjects((objects) => {
    const result = jqmerge.mergeObjects(objects);
    output.outputJson(result);
});
