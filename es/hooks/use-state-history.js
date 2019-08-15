function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { useRef } from 'react';
import { get } from 'lodash';

var useStateHistory = function useStateHistory(value) {
  var historyRef = useRef();
  historyRef.current = [].concat(_toConsumableArray(historyRef.current || []), [value]);
  return {
    stateHistory: historyRef.current,
    getByIndex: function getByIndex(index) {
      return get(historyRef, "current.".concat(index));
    },
    getPrevious: function getPrevious() {
      return get(historyRef, "current.".concat(historyRef.current.length - 2));
    },
    getCurrent: function getCurrent() {
      return get(historyRef, "current.".concat(historyRef.current.length - 1));
    }
  };
};

export { useStateHistory };