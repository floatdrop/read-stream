var Readable = require('stream').Readable;

var rs = new Readable();

setTimeout(function() {
    rs.push('beep ');
    rs.push('boop\n');
    rs.push(null);
}, 1000);

rs.pipe(process.stdout);
