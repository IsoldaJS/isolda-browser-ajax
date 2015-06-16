var request = require('browser-request');

// Shamelessly stolen from https://github.com/lodash/lodash/blob/3.9.0/lodash.src.js#L8870
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

var requestHelper = function(options, resolve, reject) {
  options || (options = {});

  if (options.json == null) {
    options.json = true;
  }

  request(options, function(err, response, body) {
    if (err) {
      return reject(err);
    }
    if (200 <= response.status && response.status < 400) {
      return resolve(body);
    }
    err = {
      status: response.status,
      message: response.statusText,
      payload: response.body
    };
    return reject(err);
  });
};

module.exports = function (options) {
  options || (options = {});

  var data, isGet, isJson, method, newOptions;

  if (options.type) {
    method = options.type.toUpperCase();
  } else {
    method = 'GET';
  }

  isGet = method === 'GET';
  data = options.data || {};
  isJson = isObject(data);

  newOptions = {
    url: options.url,
    method: method,
    headers: options.headers || {},
    body: !isGet ? data : void 0,
    qs: isGet ? data : void 0,
    json: isJson
  };

  if (options.contentType) {
    newOptions.headers['Content-Type'] = options.contentType;
  }

  requestHelper(newOptions, function (body) {
    typeof options.success === "function" && options.success(body);
  }, function (err) {
    typeof options.error === "function" && options.error(err);
  });
};
