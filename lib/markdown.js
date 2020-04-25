const markdownIt = require('markdown-it');
const hljs = require('highlight.js');
const md = markdownIt({
    highlight: (str, lang) => {
        if(lang) {
            if(! hljs.getLanguage(lang)) {
                throw new Error(`Unknown code language: ${lang}!`);
            }
            return hljs.highlight(lang, str).value;
        }
        return '';
    }
});

function render(markdown) {
    return md.render(markdown);
}

module.exports = {
    render
};