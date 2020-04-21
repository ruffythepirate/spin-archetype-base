#!/usr/bin/env node

const standardIn = require('./lib/standardIn');

const mapUtils = require('./lib/map-inline');

standardIn.withAllRead((text) => {
    const currentObject = JSON.parse(text);
    const config = mapUtils.parseConfiguration(process.argv.splice(2));

    const finalCommand = mapUtils.replacePlaceholders(config.command, currentObject);
    const commandResult = mapUtils.invokeShellCommand(finalCommand);

    currentObject[config.property] = mapUtils.asJsonOrString(commandResult);
    console.log(JSON.stringify(currentObject, null, 2));
})
