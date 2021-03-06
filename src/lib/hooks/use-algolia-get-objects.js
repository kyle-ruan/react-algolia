import { useEffect, useReducer } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

const INITIAL_STATE = {
  loading: true,
  objects: [],
  error: undefined
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
        objects: action.payload.objects,
        loading: false
      };

    case 'error':
      return {
        ...INITIAL_STATE,
        error: action.payload.error,
        loading: false
      };

    case 'reset':
      return {
        ...INITIAL_STATE,
        loading: false
      };

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

  const stringifiedFields = JSON.stringify(fields);
  const stringifiedObjectIds = JSON.stringify(objectIds);

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

    if (!index) {
      return;
    }

    getObjects({ objectIds, fields });

    return () => cancelled = true;
  }, [index, stringifiedFields, stringifiedObjectIds]);

  return { loading, error, objects, index };
};

export { useAlgoliaGetObjects };