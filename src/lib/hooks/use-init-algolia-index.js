import { useState, useEffect } from 'react';
import { makeAlgoliaClient } from '../utils/make-algolia-client';

const useInitAlgoliaIndex = applications => {
  const [indexes, setIndexes] = useState({});

  useEffect(() => {
    const initIndexes = () => {
      const indexes = applications.reduce(
        (accu, { applicationId, apiKey, indexName }) => {
          if (!apiKey) {
            return accu;
          }
          const algoliaClient = makeAlgoliaClient({
            appId: applicationId,
            apiKey
          });

          return {
            ...accu,
            [indexName]: algoliaClient.initIndex(indexName)
          };
        },
        {}
      );

      setIndexes(indexes);
    };

    initIndexes();
  }, [applications]);

  return indexes;
};

export { useInitAlgoliaIndex };
