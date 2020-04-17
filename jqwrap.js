#! /usr/bin/env node
const readline = require('readline');
const argv = require('minimist')(process.argv.slice(2));

const rl = readline.createInterface({
    input: process.stdin,
    terminal: true
    //output: process.stdout
});

const stdInLines = [];
rl.on('line', function(line){
    stdInLines.push(line);
}).on('close', function() {
    let input = stdInLines.join('\n');

    try {
        input = JSON.parse(input);
    } catch {
    }

    const wrapProperty = argv._[0];
    const wrapObject = {};

    wrapObject[wrapProperty] = input;
    console.log(JSON.stringify(wrapObject, null, 2));
  });

