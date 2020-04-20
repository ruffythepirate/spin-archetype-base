
function extractTitleFromLine(line) {
    return line.startsWith('# ') ? line.substring(2).trim() :undefined
}

module.exports = {
    extractTitleFromLine
};