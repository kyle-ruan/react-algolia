import React from 'react';
import { useAlgoliaGetObject } from '../lib/hooks';


const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const OBJECT_ID = 'aws-devops-pro';

const GetObject = () => {
  const { object, loading }  = useAlgoliaGetObject({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    objectId: OBJECT_ID
  });

  if (loading) {
    return <div>Loading</div>
  }

  return <div>{object.title}</div>
};

export { GetObject };