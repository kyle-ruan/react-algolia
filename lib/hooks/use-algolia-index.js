"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAlgoliaIndex = void 0;

var _lodash = require("lodash");

var _react = require("react");

var _AlgoliaContext = require("../AlgoliaContext");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useAlgoliaIndex = function useAlgoliaIndex(_ref) {
  var indexName = _ref.indexName,
      replica = _ref.replica;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      algoliaIndex = _useState2[0],
      setAlgoliaIndex = _useState2[1];

  var algoliaContext = (0, _react.useContext)(_AlgoliaContext.AlgoliaContext);
  var index = (0, _lodash.get)(algoliaContext, "".concat(indexName, ".replicas.").concat(replica)) || (0, _lodash.get)(algoliaContext, "".concat(indexName, ".default")) || (0, _lodash.get)(algoliaContext, indexName);
  ;
  (0, _react.useEffect)(function () {
    if (index) {
      setAlgoliaIndex(index);
    }
  }, [indexName, index, replica]);
  return algoliaIndex;
};

exports.useAlgoliaIndex = useAlgoliaIndex;