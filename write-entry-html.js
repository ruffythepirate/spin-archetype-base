#! /usr/bin/env node
const lib = require('./lib/write-entry-html');
const standardIn = require('./lib/standardIn');

standardIn.withAllRead((content) => {
    const arguments = lib.getArguments();

    lib.writeFile(argv, content);
});
