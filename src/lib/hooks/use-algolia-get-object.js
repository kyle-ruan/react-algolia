import { useEffect, useReducer } from 'react';
import { useAlgoliaIndex } from './use-algolia-index';

const INITIAL_STATE = {
  lodaing: false,
  object: null,
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
        object: action.payload.object
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
};

const makeGetObject = ({
  index,
  setLoading,
  setObject,
  setError
}) => ({
  objectId,
  fields
}) => {
    if (!objectId) {
      return Promise.resolve();
    }
    return index.getObject(objectId, fields)
      .then(object => {
        setLoading(false);
        setObject(object);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }

const useAlgoliaGetObject = ({
  indexName,
  objectId,
  fields = ['*']
}) => {
  const [{ object, loading, error }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const index = useAlgoliaIndex({ indexName });

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
    }
    if (!index || !objectId) {
      dispatch({ type: 'reset' });
      return;
    }

    getObject({ objectId, fields });

    return () => cancelled = true;
  }, [index, objectId, JSON.stringify(fields)]);

  return { loading, error, object };
};

export { useAlgoliaGetObject };