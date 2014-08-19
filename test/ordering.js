/* global describe, it */

var through = require('through2');
var read = require('../');
var assert = require('stream-assert');

function write(stream, msg, timeout) {
    setTimeout(function () {
        stream.write(msg);
        stream.end();
    }, timeout);
}

describe('ordering', function () {
    it('should order streams', function (done) {
        var stream1 = through.obj();
        var stream2 = through.obj();

        write(stream1, 1, 10);
        write(stream2, 2, 5);

        read(stream2, stream1)
            .pipe(assert.first(2))
            .pipe(assert.second(1))
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should not mess with ordered streams', function (done) {
        var stream1 = through.obj();
        var stream2 = through.obj();

        write(stream1, 1, 5);
        write(stream2, 2, 10);

        read(stream2, stream1)
            .pipe(assert.first(1))
            .pipe(assert.second(2))
            .pipe(assert.length(2))
            .on('end', done);
    });
});
