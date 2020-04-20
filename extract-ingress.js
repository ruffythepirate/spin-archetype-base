#!/usr/bin/env node

const extractIngress = require('./lib/extract-ingress');
const standardLib = require('./lib/standardIn');

standardLib.withAllReadAsArray((lines) => {
    const ingress = extractIngress.extractIngress(lines)
    console.log(ingress);
})