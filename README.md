# signalr-node

A fork of `signalr` which works in Node, instead of the browser.

It's based on [signalr-no-jquery](https://github.com/DVLP/signalr-no-jquery) which shims jQuery as the first step.

This repo takes it all the way and removes all reference to browser-specific standards.

Specifically, anything to do with `window`, user-agent detection, or cross-origin consideration has been replaced or stripped out.

It also removes the `foreverFrame` transport, as it's useless outside the browser.

The `serverSendEvents` and `webSockets` transports have been implemnted by two dependencies: [EventSource](https://github.com/EventSource/eventsource) for `serverSendEvents` and [ws](https://github.com/websockets/ws) for `webSockets`.

All transports allow the use of a bearer access token by setting this via `connection.accessToken`. The token is then automatically set as an `Authorization` header.

For maximum flexibility, `longPolling` and any other AJAX will use a method provided by the user, here's a recommended implementation using [request](https://www.npmjs.com/package/request):

```javascript
var request = require('request');

var ajax = function(options) {
  request({
    url: options.url,
    method: options.type,
    headers: {
      'content-type': options.contentType || 'application/text'
    },
    body: options.data && Object.keys(options.data).map((key) => key + '=' + encodeURIComponent(options.data[key])).join('&'),
    json: options.dataType == 'json',
    timeout: options.timeout || 30000
  }, function (error, response, body) {
    if (error !== null || response.statusCode >= 400) {
      if (options.error) {
        options.error({});
      }
    } else {
      if (options.success) {
        options.success(body);
      }
    }
  });
}

var signalr = require('signalr-node')(ajax);
```
