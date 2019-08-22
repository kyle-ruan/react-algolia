import React from 'react';
import ReactJson from 'react-json-view'
import { useAlgoliaGetObjects } from '../lib/hooks';

const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const OBJECT_IDS = ['aws-devops-pro', 'aws-csysops'];

const GetObjects = () => {
  const response = useAlgoliaGetObjects({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    objectIds: OBJECT_IDS
  });

  return <ReactJson src={response} theme="chalk" name={false} />
};

export { GetObjects };