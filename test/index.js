/* global describe, it */

var should = require('should');
var through = require('through2');
var read = require('../');

describe('read', function () {
    it('should end if no streams are given', function (done) {
        read()
            .on('data', done)
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
