import React from 'react';
import { useAlgoliaGetObjects } from '../lib/hooks';

const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const OBJECT_IDS = ['aws-devops-pro', 'aws-csysops'];

const GetObjects = () => {
  const { objects, loading } = useAlgoliaGetObjects({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    objectIds: OBJECT_IDS
  });

  if (loading) {
    return <div>Loading</div>
  }
  return objects.map(({ title }) => <div key={title}>Title: {title}</div>)
};

export { GetObjects };