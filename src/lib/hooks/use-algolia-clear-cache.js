import { useEffect } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

const useAlgoliaClearCache = ({ indexName }) => {
  const index = useAlgoliaIndex({ indexName });

  useEffect(() => {
    return () => {
      if (index) {
        index.clearCache();
      }
    };
  }, [index]);
};

export { useAlgoliaClearCache };
