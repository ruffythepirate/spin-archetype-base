const {tryParseAsJson} = require('./common/json-helper');
const readline = require('readline');

function createReadLine() {
    return readline.createInterface({
        input: process.stdin,
        terminal: true
    });
}

function withAllObjects(handler) {
    const objects = [];
    forEachObject((obj) => {
        objects.push(obj);
    }, () => {
        handler(objects);
    });
}

function withAllRead(handler) {
    const rl = createReadLine();

    const stdInLines = [];
    rl.on('line', function (line) {
        stdInLines.push(line);
    }).on('close', function () {
        handler(stdInLines.join('\n'));
    });
}

function withAllReadAsArray(handler) {
    const rl = createReadLine();

    const stdInLines = [];
    rl.on('line', function (line) {
        stdInLines.push(line);
    }).on('close', function () {
        handler(stdInLines);
    });
}
function forEachLine(handler, onDone) {
    const rl = createReadLine();
    rl.on('line', function (line) {
        const done = handler(line)
        if(done) {
            process.exit(0);
        }
    })
        .on('close', function () {
        if(onDone){
            onDone();
        }
    });
}

function forEachObject(handler, onDone) {
    let currentLines = '';
    forEachLine((line) => {
        currentLines += line;
        const object = tryParseAsJson(currentLines) //Tries if the whole works as an object
            || tryParseAsJson(currentLines.slice(1).slice(0, -1)) // Tries to remove a possible leading [ or ending ] or ,;
        if(object) {
            handler(object);
            currentLines = '';
        }

    }, onDone );
}

module.exports = {
    withAllRead,
    forEachLine,
    forEachObject,
    withAllReadAsArray,
    withAllObjects
};