const readline = require('readline');

function withAllRead(handler) {
    const rl = readline.createInterface({
        input: process.stdin,
        terminal: true
    });

    const stdInLines = [];
    rl.on('line', function (line) {
        stdInLines.push(line);
    }).on('close', function () {
        handler(stdInLines.join('\n'));
    });
}

function forEachLine(handler) {

}

module.exports = {
    withAllRead,
    forEachLine
};