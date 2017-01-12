# signalr-node

A fork of `signalr` which works in Node, instead of the browser.

It's based on [signalr-no-jquery](https://github.com/DVLP/signalr-no-jquery) which shims jQuery as the first step.

This repo takes it all the way and removes all reference to browser-specific standards.

Specifically, anythign to do with `window`, user-agent detection, or cross-origin consideration has been replaced or stripped out.

It also removes the `foreverFrame` transport, as it's useless outside the browser.

The `serverSendEvents` and `webSockets` transports have been stripped out because I didn't need them, but could definitely be implemented with a PR.

`longPolling` and any other AJAX is implemented with [request](https://www.npmjs.com/package/request).
