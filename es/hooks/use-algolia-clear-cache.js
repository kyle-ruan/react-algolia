import { useEffect } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

var useAlgoliaClearCache = function useAlgoliaClearCache(_ref) {
  var indexName = _ref.indexName;
  var index = useAlgoliaIndex({
    indexName: indexName
  });
  useEffect(function () {
    return function () {
      if (index) {
        index.clearCache();
      }
    };
  }, [index]);
};

export { useAlgoliaClearCache };