import React from 'react';
import { useAlgoliaGetObjects } from '../../lib/hooks/use-algolia-get-objects';

const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const GetObjectsDemo = ({ courseIds }) => {
  const { objects } = useAlgoliaGetObjects({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    objectIds: courseIds
  });

  return (
    <div className="App">
      {objects.map(({ title }) => (<div key={title}>{title}</div>))}
    </div>
  )
}

export { GetObjectsDemo };