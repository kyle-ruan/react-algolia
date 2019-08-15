function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useRef, useState, useEffect } from 'react';
import { useStateHistory } from './use-state-history';
import { useAlgoliaIndex } from './use-algolia-index';

var makeSearch = function makeSearch(index, setLoading, setSearchResults, setError) {
  return function (_ref) {
    var _ref$query = _ref.query,
        query = _ref$query === void 0 ? '' : _ref$query,
        _ref$page = _ref.page,
        page = _ref$page === void 0 ? 1 : _ref$page,
        _ref$filters = _ref.filters,
        filters = _ref$filters === void 0 ? '' : _ref$filters,
        _ref$hitsPerPage = _ref.hitsPerPage,
        hitsPerPage = _ref$hitsPerPage === void 0 ? 10 : _ref$hitsPerPage;
    index.search({
      query: query,
      filters: filters,
      page: page - 1,
      hitsPerPage: hitsPerPage
    }).then(function (searchResults) {
      setSearchResults(searchResults);
      setLoading(false);
      setError(null);
    })["catch"](function (err) {
      setSearchResults(null);
      setLoading(false);
      setError(err);
    });
  };
};

var useAlgoliaSearch = function useAlgoliaSearch(_ref2) {
  var indexName = _ref2.indexName,
      replica = _ref2.replica,
      _ref2$query = _ref2.query,
      query = _ref2$query === void 0 ? '' : _ref2$query,
      _ref2$filters = _ref2.filters,
      filters = _ref2$filters === void 0 ? '' : _ref2$filters,
      _ref2$page = _ref2.page,
      page = _ref2$page === void 0 ? 1 : _ref2$page,
      _ref2$hitsPerPage = _ref2.hitsPerPage,
      hitsPerPage = _ref2$hitsPerPage === void 0 ? 10 : _ref2$hitsPerPage,
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? 800 : _ref2$delay,
      _ref2$key = _ref2.key,
      key = _ref2$key === void 0 ? 0 : _ref2$key;
  var handlerRef = useRef();

  var _useStateHistory = useStateHistory(query),
      getPreviousQuery = _useStateHistory.getPrevious;

  var _useStateHistory2 = useStateHistory(key),
      getPreviousKey = _useStateHistory2.getPrevious;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      searchResults = _useState6[0],
      setSearchResults = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      fallback = _useState8[0],
      setFallback = _useState8[1];

  var index = useAlgoliaIndex({
    indexName: indexName,
    replica: fallback ? undefined : replica
  });
  useEffect(function () {
    if (!error) {
      return;
    }

    if (!fallback) {
      setFallback(true);
    }
  }, [error]);
  useEffect(function () {
    if (fallback) {
      setFallback(false);
    }
  }, [replica]);
  useEffect(function () {
    if (!index) {
      return;
    }

    setLoading(true);

    if (getPreviousKey() !== key) {
      index.clearCache();
    }

    var search = makeSearch(index, setLoading, setSearchResults, setError);

    if (getPreviousQuery() !== query && !!query) {
      handlerRef.current = setTimeout(function () {
        return search({
          query: query,
          filters: filters,
          page: page,
          hitsPerPage: hitsPerPage
        });
      }, delay);
    } else {
      search({
        query: query,
        filters: filters,
        page: page,
        hitsPerPage: hitsPerPage
      });
    }

    return function () {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [query, filters, page, hitsPerPage, index, key]);
  return {
    loading: loading,
    error: error,
    searchResults: searchResults,
    clearCache: function clearCache() {
      if (index) {
        index.clearCache();
      }
    }
  };
};

export { useAlgoliaSearch };