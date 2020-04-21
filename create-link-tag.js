#!/usr/bin/env node
const standardIn = require('./lib/standardIn');

standardIn.withAllRead((allContent) => {
    console.log(`<link rel="stylesheet" href="${allContent}"/>`);
})