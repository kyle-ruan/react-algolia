import { useState, useEffect, useReducer } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

const INITIAL_STATE = {
  lodaing: false,
  object: undefined,
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
        object: action.payload.object,
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
};

const useAlgoliaLazyGetObject = ({ indexName, objectId, fields = ['*'] }) => {
  const [{ object, loading, error }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );
  const [waiting, setWaiting] = useState(true);

  const index = useAlgoliaIndex({ indexName });

  const stringifiedFields = JSON.stringify(fields);

  useEffect(() => {
    let cancelled;

    const getObject = async ({ objectId, fields }) => {
      dispatch({ type: 'fetching' });

      try {
        const object = await index.getObject(objectId, fields);
        if (cancelled) {
          return;
        }
        dispatch({
          type: 'success',
          payload: { object }
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
    if (!index || waiting) {
      return;
    }

    getObject({ objectId, fields });

    return () => (cancelled = true);
  }, [index, objectId, stringifiedFields, waiting]);

  return [
    () => setWaiting(false),
    { loading, error, object, index }
  ];
};

export { useAlgoliaLazyGetObject };
