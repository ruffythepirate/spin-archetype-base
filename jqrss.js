#! /usr/bin/env node
const standardIn = require('./lib/standardIn');
const lib = require('./lib/jqrss');

standardIn.withAllObjects((objects) => {
    args = lib.parseArguments();
    const result= lib.createXmlAsString(args.channelInformation, objects);
    console.log(result);
})