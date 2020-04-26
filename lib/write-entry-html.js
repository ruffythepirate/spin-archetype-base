const {getArgumentValue } = require('./arguments-helper');
const path = require('path');
const fs = require('fs');


function getArguments() {
    const sourceRootPath = getArgumentValue('source-root', 'SOURCE_ROOT');
    const filePath = getArgumentValue('file-path', 'FILE_PATH');
    const targetRootPath = getArgumentValue('target-root', 'TARGET_ROOT');
    const fileRelativePath = path.relative(sourceRootPath, filePath);
    return {
        sourceRootPath,
        targetRootPath,
        fileRelativePath
    };
}

function writeFile(argv, content) {

    const relativePathWithoutExtension = argv.fileRelativePath.split('.')[0];
    const targetDirPath = `${argv.targetRootPath}/${relativePathWithoutExtension}`;
    fs.mkdirSync(targetDirPath, { recursive: true})
    fs.writeFileSync(targetDirPath + '/index.html', content);
    console.log(`Created file ${targetDirPath}/index.html`)
}

module.exports = {
    getArguments,
    writeFile
};