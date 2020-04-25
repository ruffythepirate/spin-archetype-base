
function mergeObjects(objects) {
    return objects.reduce((acc, cur) => {
        return {
            ...acc,
            ...cur
        };
    }, {})
}

module.exports = {
    mergeObjects
};