'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Promise = require('bluebird');

module.exports = function (matchFunc, obj, runFunc) {
  for (var _len = arguments.length, additionalArgs = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    additionalArgs[_key - 3] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    // type checks
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') reject(new Error('expecting object as the object to search'));else if (typeof matchFunc !== 'function') reject(new Error('expecting string as key to be found'));else if (typeof runFunc !== 'function') reject(new Error('expecting function to run on key'));else {
      // run array of retrieved promises
      Promise.all(
      // gets array of promises of function being called on respective properties
      propPromiseGetter(runFunc, matchFunc, obj, additionalArgs)).then(function () {
        resolve(obj);
      }).catch(function (err) {
        console.log('Error running deep search function: ', err);
        reject(err);
      });
    }
  });
};

function propPromiseGetter(runFunc, matchFunc, obj, additionalArgs, promiseArr) {
  promiseArr = promiseArr || [];
  Object.keys(obj).forEach(function (val, index) {
    if (matchFunc(obj, val)) {
      promiseArr.push(runFunc instanceof Promise ? runFunc.apply(undefined, [obj, val].concat(_toConsumableArray(additionalArgs))) : new Promise(function (resolve, reject) {
        runFunc.apply(undefined, [function (err, returnedVal) {
          if (err) return console.log('Error running promise on this property: ', val, '  Error: ', err), reject(err);else resolve();
        }, obj, val].concat(_toConsumableArray(additionalArgs)));
      }));
    }
    if (_typeof(obj[val]) === 'object') propPromiseGetter(runFunc, matchFunc, obj[val], additionalArgs, promiseArr);
  });
  return promiseArr;
}
