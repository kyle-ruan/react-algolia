import { get } from 'lodash';
import { useState, useEffect } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

const makeGetObjects = ({
  index,
  setLoading,
  setObjects,
  setError
}) => ({
  objectIds,
  fields
}) => {
    return index.getObjects(objectIds, fields)
      .then(({ results }) => {
        setLoading(false);
        setObjects(results.filter(Boolean));
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }

const useAlgoliaGetObjects = ({
  indexName,
  objectIds,
  fields = ['*']
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [objects, setObjects] = useState([]);

  const index = useAlgoliaIndex({ indexName });

  useEffect(() => {
    if (!index || !get(objectIds, 'length')) {
      setLoading(false);
      return;
    }

    const getObjects = makeGetObjects({
      index,
      setLoading,
      setObjects,
      setError
    });

    if (get(objectIds, 'length') > 0) {
      getObjects({ objectIds, fields });
    }
  }, [index, JSON.stringify(objectIds)]);

  return { loading, error, objects };
};

export { useAlgoliaGetObjects };