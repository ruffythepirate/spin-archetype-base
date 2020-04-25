#! /usr/bin/env node

const standardIn = require('./lib/standardIn');
const lib = require('./lib/markdown');



standardIn.withAllRead((content) => {
    const renderedContent = lib.render(content);
    console.log(renderedContent)
});
