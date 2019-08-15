"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInitAlgoliaIndex = void 0;

var _react = require("react");

var _lodash = require("lodash");

var _makeAlgoliaClient = require("../utils/make-algolia-client");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeInitIndex = function makeInitIndex(algoliaClient) {
  return function (indexName) {
    var indexKey = (0, _lodash.get)(indexName, 'default') || indexName;

    if ((0, _lodash.isString)(indexName)) {
      return {
        key: indexKey,
        index: algoliaClient.initIndex(indexName)
      };
    }

    var defaultIndexName = (0, _lodash.get)(indexName, "default");
    var defaultIndex = algoliaClient.initIndex(defaultIndexName);
    var replicas = (0, _lodash.get)(indexName, "replicas");

    if (!replicas) {
      return {
        key: indexKey,
        index: defaultIndex
      };
    }

    var defaultIndexMap = {
      "default": defaultIndex,
      replicas: {}
    };
    var index = Object.keys(replicas).reduce(function (accu, replica) {
      var replicaIndexName = (0, _lodash.get)(indexName, "replicas.".concat(replica));
      var replicaIndex = algoliaClient.initIndex(replicaIndexName);
      return _objectSpread({}, accu, {
        replicas: _objectSpread({}, (0, _lodash.get)(accu, 'replicas'), _defineProperty({}, "".concat(replica), replicaIndex))
      });
    }, defaultIndexMap);
    return {
      key: indexKey,
      index: index
    };
  };
};

var useInitAlgoliaIndex = function useInitAlgoliaIndex(applications) {
  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      indexes = _useState2[0],
      setIndexes = _useState2[1];

  (0, _react.useEffect)(function () {
    var initIndexes = function initIndexes() {
      var indexes = applications.reduce(function (accu, _ref) {
        var applicationId = _ref.applicationId,
            apiKey = _ref.apiKey,
            indexName = _ref.indexName;

        if (!apiKey) {
          return accu;
        }

        var algoliaClient = (0, _makeAlgoliaClient.makeAlgoliaClient)({
          appId: applicationId,
          apiKey: apiKey
        });
        var initIndex = makeInitIndex(algoliaClient);

        var _initIndex = initIndex(indexName),
            key = _initIndex.key,
            index = _initIndex.index;

        return _objectSpread({}, accu, _defineProperty({}, key, index));
      }, {});
      setIndexes(indexes);
    };

    initIndexes();
  }, [applications]);
  return indexes;
};

exports.useInitAlgoliaIndex = useInitAlgoliaIndex;