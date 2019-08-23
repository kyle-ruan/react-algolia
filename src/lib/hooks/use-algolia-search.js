import { useRef, useEffect, useReducer } from 'react';
import { useStateHistory } from './use-state-history';
import { useAlgoliaIndex } from './use-algolia-index';

const INITIAL_STATE = {
  searchResults: undefined,
  loading: true,
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
        searchResults: action.payload.searchResults,
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

const useAlgoliaSearch = ({
  indexName,
  query = '',
  filters = '',
  page = 0,
  hitsPerPage = 10,
  delay = 800,
  key = 0
}) => {
  const handlerRef = useRef();
  const [{ loading, searchResults, error }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );
  const { getPrevious: getPreviousQuery } = useStateHistory(query);
  const { getPrevious: getPreviousKey } = useStateHistory(key);

  const index = useAlgoliaIndex({ indexName });

  useEffect(() => {
    let cancelled;
    const search = async ({
      query = '',
      page = 0,
      filters = '',
      hitsPerPage = 10
    }) => {
      dispatch({ type: 'fetching' });
      try {
        const searchResults = await index.search({
          query,
          filters,
          page: page < 0 ? 0 : page,
          hitsPerPage
        });

        if (cancelled) {
          return;
        }
        dispatch({
          type: 'success',
          payload: { searchResults }
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

    if (getPreviousKey() !== key) {
      index.clearCache();
    }

    if (getPreviousQuery() !== query && !!query) {
      handlerRef.current = setTimeout(
        () => search({ query, filters, page, hitsPerPage }),
        delay
      );
    } else {
      search({ query, filters, page, hitsPerPage });
    }

    return () => {
      cancelled = true;
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [query, filters, page, hitsPerPage, index, key, delay]);

  return {
    loading,
    error,
    searchResults,
    index
  };
};

export { useAlgoliaSearch };
