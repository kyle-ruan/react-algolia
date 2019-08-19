import get from 'lodash/get';
import { useState, useEffect, useContext } from 'react';
import { AlgoliaContext } from '../AlgoliaContext';

const useAlgoliaIndex = ({ indexName }) => {
  const [algoliaIndex, setAlgoliaIndex] = useState();
  const algoliaContext = useContext(AlgoliaContext);
  const index = get(algoliaContext, indexName);

  useEffect(() => {
    if (index) {
      setAlgoliaIndex(index);
    }
  }, [indexName, index]);

  return algoliaIndex;
}

export { useAlgoliaIndex };