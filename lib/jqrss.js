const { getRequiredArgument } = require('./common/arguments-helper');

function parseArguments() {

    return {
        channelInformation: {
            title: getRequiredArgument('t', 'title'),
            description: getRequiredArgument('d', 'description'),
            link: getRequiredArgument('l', 'link'),
        }
    }
}

function createXmlAsString(channelInfo, items) {
    const result =
`<?xml version="1.0" encoding="utf-8" ?>
<rss version="2.0">
<channel>
    <title>${channelInfo.title}</title>
    <description>${channelInfo.description}</description>
    <link>${channelInfo.link}</link>
    ${items.map(item => createItemXml(channelInfo, item)).join('\n')}
</channel>`
    return result;

}

function createItemXml(channelInfo, item) {
    return `<item>
    <title>${item.title}</title>
    <description>${item.ingress}</description>
    <link>${channelInfo.link+item.path}</link>
    <pubDate>${new Date(item.createdAt)}</pubDate>
</item>`;
}

module.exports = {
    parseArguments,
    createXmlAsString
};