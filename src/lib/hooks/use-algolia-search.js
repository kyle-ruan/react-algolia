import { useRef, useState, useEffect, useReducer } from 'react';
import { useStateHistory } from './use-state-history';
import { useAlgoliaIndex } from './use-algolia-index';

const INITIAL_STATE = {
  searchResults: null,
  loading: false,
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
        searchResults: action.payload.searchResults
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

const useAlgoliaSearch = ({
  indexName,
  query = '',
  filters = '',
  page = 1,
  hitsPerPage = 10,
  delay = 800,
  key = 0
}) => {
  const handlerRef = useRef();
  const [{ loading, searchResults, error}, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { getPrevious: getPreviousQuery } = useStateHistory(query);
  const { getPrevious: getPreviousKey } = useStateHistory(key);

  const index = useAlgoliaIndex({ indexName });

  useEffect(() => {
    let cancelled;
    const search = async ({
      query = '',
      page = 1,
      filters = '',
      hitsPerPage = 10
    }) => {
      dispatch({ type: 'fetching' });
      try {
        const searchResults = await index.search({
          query,
          filters,
          page: page - 1,
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
      dispatch({ type: 'reset' });
      return;
    }

    if (getPreviousKey() !== key) {
      index.clearCache();
    }

    if (getPreviousQuery() !== query && !!query) {
      handlerRef.current = setTimeout(() => search({ query, filters, page, hitsPerPage }), delay);
    } else {
      search({ query, filters, page, hitsPerPage });
    }

    return () => {
      cancelled = true;
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    }
  }, [query, filters, page, hitsPerPage, index, key]);

  return {
    loading,
    error,
    searchResults,
    clearCache: () => {
      if (index) {
        index.clearCache();
      }
    }
  };
};

export { useAlgoliaSearch };