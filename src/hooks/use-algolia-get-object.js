import { useState, useEffect } from 'react';
import { useAlgoliaIndex } from 'hooks/use-algolia-index';

const makeGetObject = ({
  index,
  setLoading,
  setObject,
  setError
}) => ({
  objectId,
  fields
}) => {
    if (!objectId) {
      return Promise.resolve();
    }
    return index.getObject(objectId, fields)
      .then(object => {
        setLoading(false);
        setObject(object);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }

const useAlgoliaGetObject = ({
  indexName,
  objectId,
  fields = ['*']
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [object, setObject] = useState();

  const index = useAlgoliaIndex({ indexName });

  useEffect(() => {
    if (!index) {
      return;
    }

    setLoading(true);
    const getObject = makeGetObject({
      index,
      setLoading,
      setObject,
      setError
    });

    getObject({ objectId, fields });
  }, [index, objectId]);

  return { loading, error, object };
};

export { useAlgoliaGetObject };