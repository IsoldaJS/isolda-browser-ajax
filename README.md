# IsoldaJS Browser AJAX

This is a simple `ajax` function implementation suitable as [`Backbone.ajax`](http://backbonejs.org/#Sync-ajax) drop-in replacement. For example when you use Backbone without jQuery.

Normally you don't want to use this function by hand, but should you need the interface is

```
var ajax = require('@isoldajs/browser-ajax');

ajax(options);
```

Where `options` can have the following properties (subset of jQuery.ajax):

* `type` — HTTP method, defaults to 'GET',
* `url` — request URL,
* `data` — request payload. If it's an object, will be JSON stringified,
* `contentType` — if set will be passed as 'Content-Type' header,
* `headers` — any custom headers, sent as is,
* `success` — success callback, gets response body as a single argument,
* `error` — error callback, gets error object as a single argument.
