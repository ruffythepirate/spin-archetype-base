const argumentsHelper = require('./arguments-helper');
const sut = require('./write-entry-html');
const path = require('path');
const fs = require('fs');

const { when } = require('jest-when');

jest.mock('./arguments-helper')
jest.mock('path')
jest.mock('fs')

test('getting relevant paths', () => {
    const sourceRoot = 'source root'
    const filePath = 'file path'
    const fileRelativePath = 'file path'
    const targetRoot = 'target root'

    when(argumentsHelper.getArgumentValue).calledWith('source-root', 'SOURCE_ROOT').mockReturnValue(sourceRoot)
    when(argumentsHelper.getArgumentValue).calledWith('file-path', 'FILE_PATH').mockReturnValue(filePath)
    when(argumentsHelper.getArgumentValue).calledWith('target-root', 'TARGET_ROOT').mockReturnValue(targetRoot)
    when(path.relative).calledWith(sourceRoot, filePath).mockReturnValue(fileRelativePath)

    expect(sut.getArguments()).toEqual({
        sourceRootPath: sourceRoot,
        targetRootPath: targetRoot,
        fileRelativePath: fileRelativePath,
    })

});

test('writeFile should create directory as filename without extension', () => {
    const content = 'content'
    const relativePathWithoutExtensions = 'relative'
    const argv  = {
        sourceRootPath: 'source/',
        targetRootPath: 'target/',
        fileRelativePath: relativePathWithoutExtensions
    }

    sut.writeFile(argv, content);

    expect(fs.mkdirSync).toHaveBeenCalledWith(argv.targetRootPath + relativePathWithoutExtensions, { recursive: true});
});

test('writeFile should create folder as filename with extension', () => {
    const content = 'content'
    const relativePath = 'relative.md'
    const relativePathWithoutExtensions = 'relative'
    const argv  = {
        sourceRootPath: 'source/',
        targetRootPath: 'target/',
        fileRelativePath: relativePath
    }

    sut.writeFile(argv, content);

    expect(fs.mkdirSync).toHaveBeenCalledWith(argv.targetRootPath + relativePathWithoutExtensions, { recursive: true});
});

test('writeFile should create file called index with content inside created folder.', () => {
    const content = 'content'
    const relativePath = 'relative.md'
    const relativePathWithoutExtensions = 'relative'
    const argv  = {
        sourceRootPath: 'source/',
        targetRootPath: 'target/',
        fileRelativePath: relativePath
    }

    sut.writeFile(argv, content);

    expect(fs.writeFileSync).toHaveBeenCalledWith( `${argv.targetRootPath}${relativePathWithoutExtensions}/index.html`, content);
});
