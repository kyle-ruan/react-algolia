"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAlgoliaBrowseAll = void 0;

var _useAlgoliaIndex = require("./use-algolia-index");

var useAlgoliaBrowseAll = function useAlgoliaBrowseAll(_ref) {
  var indexName = _ref.indexName,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? '' : _ref$query,
      _ref$hitsPerPage = _ref.hitsPerPage,
      hitsPerPage = _ref$hitsPerPage === void 0 ? 1000 : _ref$hitsPerPage,
      filters = _ref.filters;
  var index = (0, _useAlgoliaIndex.useAlgoliaIndex)({
    indexName: indexName
  });
  return {
    browse: index ? function () {
      return index.browseAll(query, {
        hitsPerPage: hitsPerPage,
        facetFilters: filters
      });
    } : function () {
      return Promise.resolve([]);
    }
  };
};

exports.useAlgoliaBrowseAll = useAlgoliaBrowseAll;