#!/usr/bin/env node

const output = require('./lib/common/output-helper');
const mapInline = require('./lib/map-inline');
const standardIn = require('./lib/standardIn');
const {execSync} = require('child_process')

const config = mapInline.parseConfiguration(process.argv.splice(2))


const allInlineMappedObjects = [];
standardIn.forEachLine((line) => {
    const parameters = {
        input: line
    };
    const finalCommand = mapInline.replacePlaceholders(config.command, parameters)
    const commandOutput = mapInline.invokeShellCommand(finalCommand);

    const object = {};
    object[config.property] = commandOutput;
    allInlineMappedObjects.push(object);
}, () => {
    output.outputJson(allInlineMappedObjects);
});