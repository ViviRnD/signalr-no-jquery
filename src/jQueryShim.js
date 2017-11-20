'use strict';

const jQueryDeferred = require('jquery-deferred');
const jQueryParam = require('jquery-param');

const jqueryFunction = function(subject) {
  let events = subject.events || {};

  if (subject && subject === subject.window)
    return {
      0: subject,
      load: (handler) => subject.addEventListener('load', handler, false),
      bind: (event, handler) => subject.addEventListener(event, handler, false),
      unbind: (event, handler) => subject.removeEventListener(event, handler, false)
    };

  return {
    0: subject,

    unbind(event, handler) {
      let handlers = events[event] || [];

      if (handler) {
        let idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
      } else handlers = [];

      events[event] = handlers;
      subject.events = events;

    },
    bind(event, handler) {
      let current = events[event] || [];
      events[event] = current.concat(handler);
      subject.events = events;
    },
    triggerHandler(event, args) {
      let handlers = events[event] || [];
      handlers.forEach(fn => {
        if (args && args[0] && args[0].type === undefined) {
          args = [{
            type: event
          }].concat(args || []);
        } else {
          args = args || [];
        }

        fn.apply(this, args);
      });
    }
  };
};

module.exports = jQueryDeferred.extend(
  jqueryFunction,
  jQueryDeferred,
  {
  defaultAjaxHeaders: null,
  inArray: (arr, item) => arr.indexOf(item) !== -1,
  trim: str => str && str.trim(),
  isEmptyObject: obj => !obj || Object.keys(obj).length === 0,
  makeArray: arr => [].slice.call(arr, 0),
  param: obj => jQueryParam(obj),
  support: {
    cors: false
  }
});
