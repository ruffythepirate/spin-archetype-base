#! /usr/bin/env node
const readline = require('readline');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const md = require('markdown-it')();
const Handlebars = require('handlebars');

const rl = readline.createInterface({
    input: process.stdin,
    terminal: true
});

const stdInLines = [];
rl.on('line', function(line){
    stdInLines.push(line);
}).on('close', function() {
    const allInput = stdInLines.join('\n');
    const parameters = JSON.parse(allInput);

    const template = loadTemplate(argv._[0]);

    const result = Handlebars.compile(template)(parameters);


    if(argv.inline) {
        parameters.content = result;
        console.log(JSON.stringify(parameters, null, 2));
    } else {
        console.log(result);
    }
});

function loadTemplate(templateName) {
    const template = fs.readFileSync(`./templates/${templateName}.handlebars`, 'utf-8');
    return template;
}
