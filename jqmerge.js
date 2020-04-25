#! /usr/bin/env node

const readline = require('readline');
const standardIn = require('./lib/standardIn');
const jqmerge = require('./lib/jqmerge');


standardIn.withAllObjects((objects) => {
    const result = jqmerge.mergeObjects(objects);

});


const rl = readline.createInterface({
    input: process.stdin,
    terminal: true
});

const stdInLines = [];
rl.on('line', function(line){
    stdInLines.push(line);
}).on('close', function() {
    let currentString = "";
    allObjects = stdInLines.reduce((acc, cur) => {
        currentString += cur;
        const obj = tryParseAsJson(currentString);
        if(obj) {
            acc.push(obj);
            currentString = ""
        }
        return acc;
    }, []);

    const result = allObjects.reduce((acc,cur) => {
        return {
            ...acc,
            ...cur
        }
    }, {});

    console.log(JSON.stringify(result, null, 2));
});

function tryParseAsJson(str) {
    try {
        object = JSON.parse(str);
        return object;
    } catch {
    }
}


