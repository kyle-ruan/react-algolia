function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { get } from 'lodash';
import { useState, useEffect, useContext } from 'react';
import { AlgoliaContext } from '../AlgoliaContext';

var useAlgoliaIndex = function useAlgoliaIndex(_ref) {
  var indexName = _ref.indexName,
      replica = _ref.replica;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      algoliaIndex = _useState2[0],
      setAlgoliaIndex = _useState2[1];

  var algoliaContext = useContext(AlgoliaContext);
  var index = get(algoliaContext, "".concat(indexName, ".replicas.").concat(replica)) || get(algoliaContext, "".concat(indexName, ".default")) || get(algoliaContext, indexName);
  ;
  useEffect(function () {
    if (index) {
      setAlgoliaIndex(index);
    }
  }, [indexName, index, replica]);
  return algoliaIndex;
};

export { useAlgoliaIndex };