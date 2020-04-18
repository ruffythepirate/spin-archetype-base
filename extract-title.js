#! /usr/bin/env node
const lib = require('./lib/extract-title');
const standardIn = require('./lib/standardIn');

standardIn.forEachLine((line) => {
    const title = lib.extractTitleFromLine(line)
    if(title) {
        console.log(title);
    }
    return title !== undefined;
})


