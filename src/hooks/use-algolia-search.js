import { useRef, useState, useEffect } from 'react';
import { useStateHistory } from './use-state-history';
import { useAlgoliaIndex } from './use-algolia-index';

const makeSearch = (
  index,
  setLoading,
  setSearchResults,
  setError
) => ({
  query = '',
  page = 1,
  filters = '',
  hitsPerPage = 10
}) => {
    index.search({
      query,
      filters,
      page: page - 1,
      hitsPerPage
    })
      .then(searchResults => {
        setSearchResults(searchResults);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setSearchResults(null);
        setLoading(false);
        setError(err);
      })
  };

const useAlgoliaSearch = ({
  indexName,
  replica,
  query = '',
  filters = '',
  page = 1,
  hitsPerPage = 10,
  delay = 800,
  key = 0
}) => {
  const handlerRef = useRef();
  const {
    getPrevious: getPreviousQuery
  } = useStateHistory(query);
  const {
    getPrevious: getPreviousKey
  } = useStateHistory(key);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [fallback, setFallback] = useState(false);

  const index = useAlgoliaIndex({
    indexName,
    replica: fallback ? undefined : replica
  });

  useEffect(() => {
    if (!error) {
      return;
    }

    if (!fallback) {
      setFallback(true);
    }
  }, [error]);

  useEffect(() => {
    if (fallback) {
      setFallback(false);
    }
  }, [replica]);

  useEffect(() => {
    if (!index) {
      return;
    }
    setLoading(true);

    if (getPreviousKey() !== key) {
      index.clearCache();
    }
    const search = makeSearch(index, setLoading, setSearchResults, setError);

    if (getPreviousQuery() !== query && !!query) {
      handlerRef.current = setTimeout(() => search({ query, filters, page, hitsPerPage }), delay);
    } else {
      search({ query, filters, page, hitsPerPage });
    }

    return () => {
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