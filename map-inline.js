#!/usr/bin/env node

const output = require('./lib/common/output-helper');
const mapInline = require('./lib/map-inline');
const standardIn = require('./lib/standardIn');

const config = mapInline.parseConfiguration(process.argv.splice(2))

const allInlineMappedObjects = [];

standardIn.forEachObject(async (object) => {
    const finalCommand = mapInline.replacePlaceholders(config.command, object)

    const commandOutput = await mapInline.invokeShellCommand(finalCommand);

    object[config.property] = commandOutput;
    allInlineMappedObjects.push(object);
}, () => {
    output.outputJson(allInlineMappedObjects);
});
