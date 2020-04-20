#!/usr/bin/env node

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
    console.log(JSON.stringify(allInlineMappedObjects, null, 2));
});