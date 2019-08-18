import { get } from 'lodash';
import { useState, useEffect, useContext } from 'react';
import { AlgoliaContext } from '../AlgoliaContext';

const useAlgoliaIndex = ({ indexName, replica }) => {
  const [algoliaIndex, setAlgoliaIndex] = useState(null);
  const algoliaContext = useContext(AlgoliaContext);
  const index = get(algoliaContext, `${indexName}.replicas.${replica}`)
    || get(algoliaContext, `${indexName}.default`)
    || get(algoliaContext, indexName);;

  useEffect(() => {
    if (index) {
      setAlgoliaIndex(index);
    }
  }, [indexName, index, replica]);

  return algoliaIndex;
}

export { useAlgoliaIndex };