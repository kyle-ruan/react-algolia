"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAlgoliaClearCache = void 0;

var _react = require("react");

var _useAlgoliaIndex = require("./use-algolia-index");

var useAlgoliaClearCache = function useAlgoliaClearCache(_ref) {
  var indexName = _ref.indexName;
  var index = (0, _useAlgoliaIndex.useAlgoliaIndex)({
    indexName: indexName
  });
  (0, _react.useEffect)(function () {
    return function () {
      if (index) {
        index.clearCache();
      }
    };
  }, [index]);
};

exports.useAlgoliaClearCache = useAlgoliaClearCache;