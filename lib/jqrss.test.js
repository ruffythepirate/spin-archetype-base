const sut = require('./jqrss');
const args = require('./args');


test('parseArguments when info given should parse channelInformation', () => {

    args.title = 'title'
    args.description = 'description'
    args.link = 'link'

    const result = sut.parseArguments();

    expect(result).toEqual({
        channelInformation: {
            title: args.title,
            description: args.description,
            link: args.link,
        }
    });
});

test('parseArguments when channel info missing should throw', () => {
    args.title = undefined

    expect(() => {
        sut.parseArguments();
    }).toThrow();
});

function createChannelInfo() {
    const channelInfo = {
        title: 'title',
        description: 'description',
        link: 'link',
    }
    return channelInfo;
}

test('createXmlAsString when no items should create xml with channel info', () => {
    const channelInfo = createChannelInfo();
    const result = sut.createXmlAsString(channelInfo, []);

    expect(result).toMatch(/<title>title<\/title>/);
    expect(result).toMatch(/<description>description<\/description>/);
    expect(result).toMatch(/<link>link<\/link>/);
});

test('createXmlAsString when items should include items', () => {
    const now = new Date();
    const channelInfo = createChannelInfo();
    const entries = [
        {
            title: 'item-title',
            path: '/item-path',
            ingress: 'item-ingress',
            createdAt: now.getTime()
        }
    ]

    const result = sut.createXmlAsString(channelInfo, entries);

    expect(result).toMatch(/item-title/);
    expect(result).toMatch(/<description>item-ingress<\/description>/);
    expect(result).toMatch(new RegExp(`<link>${channelInfo.link}/item-path</link>`));
    expect(result).toContain(`<pubDate>${now}</pubDate>`);
});

test('createXmlAsString when items should not include commas', () => {
    const now = new Date();
    const channelInfo = createChannelInfo();
    const entries = [
        {
            title: 'item-title',
            path: '/item-path',
            ingress: 'item-ingress',
            createdAt: now.getTime()
        },
        {
            title: 'item-title',
            path: '/item-path',
            ingress: 'item-ingress',
            createdAt: now.getTime()
        }
    ]

    const result = sut.createXmlAsString(channelInfo, entries);

    expect(result).not.toContain(',');
});
