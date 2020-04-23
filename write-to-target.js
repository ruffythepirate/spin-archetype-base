#! /usr/bin/env node
const readline = require('readline');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    terminal: true
});

const stdInLines = [];
rl.on('line', function(line){
    stdInLines.push(line);
}).on('close', function() {

    const sourceRootDir = getValue('source-root', 'SOURCE_ROOT');
    const filePath = getValue('file-path', 'FILE_PATH');
    const outputRootDir = getValue('target-root', 'TARGET_ROOT');

    const relativePath = path.relative(sourceRootDir, filePath);

    const outputPathWithExtension = path.join(outputRootDir, relativePath);
    const outputDir = path.dirname(outputPathWithExtension);
    fs.mkdirSync(outputDir, {recursive: true});
    // 5. writes content to file without extension.
    const fileExtension = path.extname(outputPathWithExtension);
    let outputPath = fileExtension.length > 0 ? outputPathWithExtension.slice(0, -fileExtension.length)
    : outputPathWithExtension;
    fs.mkdirSync(outputPath);
    outputPath = outputPath + '/index.html';
    console.log("writing to", outputPath)
    fs.writeFileSync(outputPath, stdInLines.join('\n'));
});

function getValue(parameterName, environmentVariableName) {
    const value = argv[parameterName] || process.env[environmentVariableName];
    console.log(`value for ${parameterName}/${environmentVariableName} resolved to ${value}`);
    return value;
}

