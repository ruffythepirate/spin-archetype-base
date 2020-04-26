#! /usr/bin/env node
const readline = require('readline');

const output = require('./lib/common/output-helper');
const fs = require('fs');
const md = require('markdown-it')();
const Handlebars = require('handlebars');
const argv = require('minimist')(process.argv.slice(2));

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
        output.outputJson(parameters);
    } else {
        console.log(result);
    }
});

function getOverrideTemplateDirPath() {
    return argv.otp || argv["override-templates-path"] || process.env["OVERRIDE_TEMPLATES_PATH"]
}

function getDefaultTemplateDirPath() {
    return argv.dtp || argv["default-templates-path"] || process.env["DEFAULT_TEMPLATES_PATH"] || './templates'
}

function loadTemplate(templateName) {
    // first check override dir (if exists)
    let overridePath = getOverrideTemplateDirPath();
    if(overridePath) {
        const template = tryLoadTemplate(overridePath, templateName);
        if (template)
            return template;
    }
    // then check /spin/templates folder
    const defaultPath = getDefaultTemplateDirPath();
    const template = tryLoadTemplate(defaultPath, templateName);
    if (template)
        return template;

    // if nowhere found, throw error
    throw Error(`Unable to find template for ${templateName}, looked in ${overridePath} and ${defaultPath}`)
}

function tryLoadTemplate(dirPath, templateName) {
    const filePath = `${dirPath}/${templateName}.handlebars`;
    return fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8');
}
