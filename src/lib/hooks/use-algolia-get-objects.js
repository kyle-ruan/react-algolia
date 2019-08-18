
import get from 'lodash/get';
import { useEffect, useReducer } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

const INITIAL_STATE = {
  loading: false,
  objects: [],
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        loading: true
      };

    case 'success':
      return {
        ...INITIAL_STATE,
        objects: action.payload.objects
      };

    case 'error':
      return {
        ...INITIAL_STATE,
        error: action.payload.error
      };

    case 'reset':
      return INITIAL_STATE;

    default:
      return state;
  }
}

const useAlgoliaGetObjects = ({
  indexName,
  objectIds,
  fields = ['*']
}) => {
  const [{ objects, loading, error }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const index = useAlgoliaIndex({ indexName });

  useEffect(() => {
    let cancelled;
    const getObjects = async ({ objectIds, fields }) => {
      dispatch({ type: 'fetching' });
      try {
        const { results } = await index.getObjects(objectIds, fields);

        if (cancelled) {
          return;
        }
        dispatch({
          type: 'success',
          payload: { objects: results.filter(Boolean) }
        });
      } catch (err) {
        if (cancelled) {
          return;
        }
        dispatch({
          type: 'error',
          payload: { error: err }
        });
      }
      cancelled = false;
    };

    if (!index || !get(objectIds, 'length')) {
      dispatch({ type: 'reset' })
      return;
    }

    getObjects({ objectIds, fields });

    return () => cancelled = true;
  }, [JSON.stringify(fields), index, JSON.stringify(objectIds)]);

  return { loading, error, objects };
};

export { useAlgoliaGetObjects };