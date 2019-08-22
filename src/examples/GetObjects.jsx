import React, { useEffect } from 'react';
import { useAlgoliaLazyGetObjects } from '../lib/hooks';

const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const GetObjects = ({ objectIds }) => {
  const [execute, { objects, loading }] = useAlgoliaLazyGetObjects({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    objectIds
  });

  useEffect(() => {
    if (objectIds.length > 0) {
      execute();
    }
  }, [objectIds]);

  if (loading) {
    return <div>Loading</div>
  }
  return objects.map(({ title }) => <div key={title}>Title: {title}</div>)
};

export { GetObjects };