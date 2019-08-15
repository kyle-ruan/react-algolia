"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAlgoliaGetObject = void 0;

var _react = require("react");

var _useAlgoliaIndex = require("hooks/use-algolia-index");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var makeGetObject = function makeGetObject(_ref) {
  var index = _ref.index,
      setLoading = _ref.setLoading,
      setObject = _ref.setObject,
      setError = _ref.setError;
  return function (_ref2) {
    var objectId = _ref2.objectId,
        fields = _ref2.fields;

    if (!objectId) {
      return Promise.resolve();
    }

    return index.getObject(objectId, fields).then(function (object) {
      setLoading(false);
      setObject(object);
    })["catch"](function (err) {
      setLoading(false);
      setError(err);
    });
  };
};

var useAlgoliaGetObject = function useAlgoliaGetObject(_ref3) {
  var indexName = _ref3.indexName,
      objectId = _ref3.objectId,
      _ref3$fields = _ref3.fields,
      fields = _ref3$fields === void 0 ? ['*'] : _ref3$fields;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      object = _useState6[0],
      setObject = _useState6[1];

  var index = (0, _useAlgoliaIndex.useAlgoliaIndex)({
    indexName: indexName
  });
  (0, _react.useEffect)(function () {
    if (!index) {
      return;
    }

    setLoading(true);
    var getObject = makeGetObject({
      index: index,
      setLoading: setLoading,
      setObject: setObject,
      setError: setError
    });
    getObject({
      objectId: objectId,
      fields: fields
    });
  }, [index, objectId]);
  return {
    loading: loading,
    error: error,
    object: object
  };
};

exports.useAlgoliaGetObject = useAlgoliaGetObject;