// TODO: this tinyish test suite is ported from browser-request package, extend

var assert = require('assert');

var request = require('..');

describe('Request', function () {
  it('should allow CORS', function (done) {
    request({
      url: 'https://www.googleapis.com/plus/v1/activities',
      success: function (body) {
        assert.ok(false, "This call shouldn't succeed");
      },
      error: function (error) {
        assert.equal(error.status, 400);
        assert.ok(error.payload.error.message.match(/Required parameter/));
        done();
      }
    });
  });

  it('should support json', function (done) {
    request({
      url: 'https://www.googleapis.com/plus/v1/activities',
      json: true,
      success: function (body) {
        assert.ok(false, "This call shouldn't succeed");
      },
      error: function (error) {
        assert.equal(error.status, 400);
        done();
      }
    });
  });

});
