import React from 'react';
import ReactJson from 'react-json-view'
import { useAlgoliaGetObject } from '../lib/hooks';


const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const OBJECT_ID = 'aws-devops-pro';

const GetObject = () => {
  const response  = useAlgoliaGetObject({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    objectId: OBJECT_ID
  });
  return <ReactJson src={response} theme="chalk" name={false} />
};

export { GetObject };