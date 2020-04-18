const readline = require('readline');

function createReadLine() {
    const rl = readline.createInterface({
        input: process.stdin,
        terminal: true
    });
    return rl;
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

function forEachLine(handler, onDone) {
    const rl = createReadLine();
    rl.on('line', function (line) {
        const done = handler(line)
        if(done) {
            process.exit(0);
        }
    }).on('close', function () {
        if(onDone){
            onDone();
        }
    });
}

module.exports = {
    withAllRead,
    forEachLine
};