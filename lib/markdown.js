const markdownIt = require('markdown-it');
const md = markdownIt();

function render(markdown) {
    return md.render(markdown);
}

module.exports = {
    render
};