#! /usr/bin/env node

const fs = require('fs');

const standardIn = require('./lib/standardIn');

standardIn.withAllRead((allText) => {
  const filenames = allText.split('\n')


   let outputObject;
   if(filenames.length === 1) {
       outputObject = extractMetadata(filenames.pop())
   } else {
       outputObject = filenames.reduce((acc, cur) => {
           acc.push(extractMetadata(cur));
           return acc;
       }, [])
   }
    console.log(JSON.stringify(outputObject, null , 2));
});

function extractMetadata(filename) {
    const fileStats = fs.lstatSync(filename);

    const [rootName, ...extensions] = filename.split('.');
    const metadata = {
        filename: filename,
        rootName: rootName,
        extension: extensions.join('.'),
        createdAt: convertMsToIsoDate(fileStats.birthtimeMs),
        updatedAt: convertMsToIsoDate(fileStats.mtimeMs),
        ingress: extractIngress(filename)
    }
    return metadata;

}

function extractIngress(fileUrl) {
    // Reads the file
    const content = fs.readFileSync(fileUrl, 'utf-8');

    // Reads all rows until a first # is found.
    let ingressRows = content.split('\n');
    const firstHeadingIndex = ingressRows.findIndex((row) => row.startsWith("#"));
    ingressRows = firstHeadingIndex >= 0 ? ingressRows.filter((row,index) => index < firstHeadingIndex): ingressRows;

    const ingress = ingressRows.join('\n');
    //Limits the ingress to 400 characters
    return ingress.length > 400 ? ingress.slice(0, 400) : ingress;
}

function convertMsToIsoDate(statMsTime) {
    const date = new Date(statMsTime);
    return date.toISOString();
}

