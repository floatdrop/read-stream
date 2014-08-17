var through = require('through2');

function read() {
    var streams = Array.prototype.slice.call(arguments, 0);
    var options = { objectMode: true };

    var last = streams[streams.length - 1];
    if (last && typeof last.pipe !== 'function') { options = last; }

    if (Array.isArray(streams[0])) { streams = streams[0]; }

    options.allowHalfOpen = true;

    var rs = through(options);

    function processStream(stream) {
        stream.on('data', rs.push.bind(rs));
        stream.on('error', rs.emit.bind(rs, 'error'));
        stream.on('end', next);
    }

    function next() {
        if (streams.length) {
            processStream(streams.shift());
        } else {
            rs.end();
        }
    }

    next();

    return rs;
}

module.exports = read;
