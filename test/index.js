/* global describe, it */

// var should = require('should');
// var through = require('through2');
var read = require('../');

describe('read', function () {
    it('should end if no streams are given', function (done) {
        read()
            .on('data', done)
            .on('end', done);
    });
});
