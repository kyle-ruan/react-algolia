function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { get } from 'lodash';
import { useState, useEffect } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

var makeGetObjects = function makeGetObjects(_ref) {
  var index = _ref.index,
      setLoading = _ref.setLoading,
      setObjects = _ref.setObjects,
      setError = _ref.setError;
  return function (_ref2) {
    var objectIds = _ref2.objectIds,
        fields = _ref2.fields;
    return index.getObjects(objectIds, fields).then(function (_ref3) {
      var results = _ref3.results;
      setLoading(false);
      setObjects(results.filter(Boolean));
    })["catch"](function (err) {
      setLoading(false);
      setError(err);
    });
  };
};

var useAlgoliaGetObjects = function useAlgoliaGetObjects(_ref4) {
  var indexName = _ref4.indexName,
      objectIds = _ref4.objectIds,
      _ref4$fields = _ref4.fields,
      fields = _ref4$fields === void 0 ? ['*'] : _ref4$fields;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      objects = _useState6[0],
      setObjects = _useState6[1];

  var index = useAlgoliaIndex({
    indexName: indexName
  });
  useEffect(function () {
    if (!index || !get(objectIds, 'length')) {
      setLoading(false);
      return;
    }

    var getObjects = makeGetObjects({
      index: index,
      setLoading: setLoading,
      setObjects: setObjects,
      setError: setError
    });

    if (get(objectIds, 'length') > 0) {
      getObjects({
        objectIds: objectIds,
        fields: fields
      });
    }
  }, [index, JSON.stringify(objectIds)]);
  return {
    loading: loading,
    error: error,
    objects: objects
  };
};

export { useAlgoliaGetObjects };