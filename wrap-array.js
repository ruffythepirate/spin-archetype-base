#!/usr/bin/env node

const standardIn = require('./lib/standardIn');

standardIn.withAllReadAsArray((lines) => {
    console.log(JSON.stringify(lines));
})
