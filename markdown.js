#! /usr/bin/env node

const readline = require('readline');
const md = require('markdown-it')();

const rl = readline.createInterface({
    input: process.stdin,
    terminal: true
});

const stdInLines = [];
rl.on('line', function(line){
    stdInLines.push(line);
}).on('close', function() {
    const allInput = stdInLines.join('\n');

    const renderedContent = md.render(allInput);
    console.log(renderedContent)
});


