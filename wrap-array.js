#!/usr/bin/env node

const standardIn = require('./lib/standardIn');
const output = require('./lib/common/output-helper');

standardIn.withAllReadAsArray((lines) => {
    output.outputJson(lines);
})
