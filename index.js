var through = require('through2');

function read() {
    var args = Array.prototype.slice.call(arguments, 0);
    var streams;
    var options = {};

    if (args[0] && args[0].length && args[0].shift) { streams = args.shift(); }

    var last = args[args.length - 1];
    if (last && typeof last.pipe !== 'function') {
        options = args.pop();
    }

    if (!streams) { streams = args; }

    options.objectMode = options.objectMode === undefined ? true : options.objectMode;

    var rs = through(options);

    function processStream(stream) {
        stream.on('data', rs.push.bind(rs));
        stream.on('error', rs.emit.bind(rs, 'error'));
        stream.once('end', next);
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
