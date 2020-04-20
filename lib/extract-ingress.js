
function extractIngress(lines) {
    let started = false;
    const ingressLines = []
    for(line of lines) {
       if(started) {
          if (hasHeading(line)) {
              return joinIngressLines(ingressLines)
          }
          ingressLines.push(line)
       } else if(hasHeading(line)) {
           started = true;
       }
    }

    return joinIngressLines(ingressLines)

}

function joinIngressLines(lines) {
    const ingressString = lines.length > 0 ? lines.join('\n').trim() : '';
    return ingressString.length >403 ? ingressString.substring(0,400) + '...' : ingressString;
}

function hasHeading(line) {
    return line.trim().startsWith('#');
}

module.exports = {
    extractIngress
};