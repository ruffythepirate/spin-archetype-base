function tryParseAsJson(str, defaultValue) {
    str = str.trim();
    try {
        object = JSON.parse(str);
        return object;
    } catch {
        return defaultValue
    }
}

module.exports = {
    tryParseAsJson
};
