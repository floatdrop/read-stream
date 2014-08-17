/* global describe, it */

var should = require('should');
var through = require('through2');
var read = require('../');
var assert = require('stream-assert');

describe('read', function () {
    it('should end if no streams are given', function (done) {
        read()
            .on('data', done)
            .on('end', done);
    });

    it('should accept options', function (done) {
        read({})
            .on('data', done)
            .on('end', done);
    });

    it('should accept array of streams', function (done) {
        var stream = through.obj();

        stream.write(1);
        stream.end();

        read([stream])
            .pipe(assert.first(1))
            .pipe(assert.length(1))
            .on('end', done);

    });

    it('should emit stream errors downstream', function (done) {
        var stream = through.obj();

        setTimeout(function () {
            stream.emit('error', new Error('Bang!'));
        }, 10);

        read(stream)
            .on('error', function (err) {
                should.exist(err);
                done();
            });
    });
});
