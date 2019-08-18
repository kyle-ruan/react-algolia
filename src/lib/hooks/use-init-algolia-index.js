import { useState, useEffect } from 'react';
import { get, isString } from 'lodash';
import { makeAlgoliaClient } from '../utils/make-algolia-client';

const makeInitIndex = (algoliaClient) =>
  (indexName) => {
    const indexKey = get(indexName, 'default') || indexName;

    if (isString(indexName)) {
      return {
        key: indexKey,
        index: algoliaClient.initIndex(indexName)
      };
    }

    const defaultIndexName = get(indexName, `default`);
    const defaultIndex = algoliaClient.initIndex(defaultIndexName);

    const replicas = get(indexName, `replicas`);

    if (!replicas) {
      return {
        key: indexKey,
        index: defaultIndex
      };
    }

    const defaultIndexMap = {
      default: defaultIndex,
      replicas: {}
    };

    const index = Object.keys(replicas).reduce((accu, replica) => {
      const replicaIndexName = get(indexName, `replicas.${replica}`);
      const replicaIndex = algoliaClient.initIndex(replicaIndexName);

      return {
        ...accu,
        replicas: {
          ...get(accu, 'replicas'),
          [`${replica}`]: replicaIndex
        }
      }
    }, defaultIndexMap);
    return { key: indexKey, index };
  };

const useInitAlgoliaIndex = (applications) => {
  const [indexes, setIndexes] = useState({});

  useEffect(() => {
    const initIndexes = () => {
      const indexes = applications.reduce((accu, { applicationId, apiKey, indexName }) => {
        if (!apiKey) {
          return accu;
        }
        const algoliaClient = makeAlgoliaClient({
          appId: applicationId,
          apiKey
        });
        const initIndex = makeInitIndex(algoliaClient);

        const { key, index } = initIndex(indexName);

        return {
          ...accu,
          [key]: index
        }
      }, {});

      setIndexes(indexes);
    };

    initIndexes();
  }, [applications]);

  return indexes;
};

export { useInitAlgoliaIndex };