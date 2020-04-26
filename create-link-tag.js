#!/usr/bin/env node
const standardIn = require('./lib/standardIn');

standardIn.forEachLine((line) => {
    console.log(`<link rel="stylesheet" href="${line}"/>`);
});