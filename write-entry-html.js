#! /usr/bin/env node
const lib = require('./lib/write-entry-html');
const standardIn = require('./lib/standardIn');

standardIn.withAllRead((content) => {
    const args = lib.getArguments();

    lib.writeFile(args, content);
});
