const standardIn = require('./standardIn');
const readline = require('readline');

jest.mock('readline');

let readlineInterface;
beforeEach(() => {
    setupReadline()
})

test('forEachLine triggers for each line' , () => {
    const lines = [];
    standardIn.forEachLine((line) => {
        lines.push(line)
    })

    triggerLines(['first', 'second'])

    expect(lines.length).toBe(2)
    expect(lines).toEqual(['first', 'second'])

});

function setupForEachObject() {
    const lines = [];
    standardIn.forEachObject((object) => {
        lines.push(object)
    })
    return lines;
}

function toLinesWithoutBrackets(inputObjects) {
    const inputLines = JSON.stringify(inputObjects, null, 2)
        .replace('[', '')
        .replace(']', '')
        .replace('},', '}')
        .split('\n')
    return inputLines;
}

function toLinesWithBrackets(inputObjects) {
    return JSON.stringify(inputObjects, null, 2).split('\n')
}

test('forEachObject triggers for each object when no []', () => {
    const objects = setupForEachObject();
    const inputObjects = [{
        hello: "world"
    }, {hello2: "world2"}]
    const inputLines = toLinesWithoutBrackets(inputObjects);

    triggerLines(inputLines);

    expect(objects.length).toBe(2)
    expect(objects).toEqual(inputObjects)
});

test('forEachObject handles two objects when brackets.', () => {
    const objects = setupForEachObject();
    const inputObjects = [{
        hello: "world"
    }, {hello2: "world2"}]
    const inputLines = toLinesWithBrackets(inputObjects);

    triggerLines(inputLines);

    expect(objects.length).toBe(2)
    expect(objects).toEqual(inputObjects)
});


function setupReadline() {
    readlineInterface = {
        on: jest.fn()
    };
    readlineInterface.on.mockReturnValue(readlineInterface);

    readline.createInterface.mockReturnValue(readlineInterface);
}

function triggerLines(lines) {
    expect(readlineInterface.on).toHaveBeenCalledWith('line', expect.any(Function))
    expect(readlineInterface.on).toHaveBeenCalledWith('close', expect.any(Function))

    lines.forEach(line => readlineInterface.on.mock.calls[0][1](line))
}

