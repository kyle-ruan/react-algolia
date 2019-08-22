import React, { useEffect } from 'react';
import { useAlgoliaLazyGetObject } from '../lib/hooks';

const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const GetObjects = ({ objectIds }) => {
  const [execute, { object, loading }] = useAlgoliaLazyGetObject({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    objectId: objectIds[0]
  });

  useEffect(() => {
    if (objectIds.length > 0) {
      execute();
    }
  }, [objectIds[0]]);

  if (loading) {
    return <div>Loading</div>
  }
  return <div key={object && object.title}>Title: {object && object.title}</div>
};

export { GetObjects };