function write(stream, msg, timeout) {
    setTimeout(function () {
        stream.write(msg);
    }, timeout);
}

var through = require('through2');
var read = require('read-streams');

var s1 = through.obj();
var s2 = through.obj();
var s3 = through.obj();

write(s3, 'stream 3', 100);
write(s2, 'stream 2', 200);
write(s1, 'stream 1', 300);

read(s1,s2,s3).on('data', console.log);
