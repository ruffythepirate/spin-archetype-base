
function extractTitleFromLine(line) {
    return line.startsWith('# ') ? line.substring(2) :undefined
}

module.exports = {
    extractTitleFromLine
};