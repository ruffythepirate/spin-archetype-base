const minimist = require('minimist')

const child_process = require('child_process');
const exec = child_process.exec;
const execSync = child_process.execSync;

function invokeShellCommand(commandAsString) {
    const buffer = execSync(commandAsString)
    const commandOutput = buffer.toString('utf-8')
    return commandOutput
}

function parseConfiguration(processArgv) {
   const argv = minimist(processArgv)

    combineArgs(argv);

    if(argv['_'].length !== 1 ) {
        throw Error('A shell command in single quotes must be provided for the foreach function!')
    }
    if(! argv.property) {
        throw Error('An inline property where the data will be inserted with either -p or --property')
    }


    return {
        command: argv._.pop(),
        property: argv.property
    };
}

function combineArgs(argv) {
    argv.property = argv.p || argv.property;
}

function replacePlaceholders(string, placeholders, allowUndefined) {

    const placeholderTexts = string.match(/\$\{(.*)\}/);

    // removes the first entry which is the whole match.
    placeholderTexts && placeholderTexts.length > 0 && placeholderTexts.shift();

    if(placeholderTexts) {
        string = placeholderTexts.reduce((acc, cur) => {
            cur = cur.substring(1)
            return acc.replace(`\$\{\.${cur}\}`, placeholders[cur] );
        }, string);
    }

    return string;
}

module.exports = {
    invokeShellCommand,
    parseConfiguration,
    replacePlaceholders
};
