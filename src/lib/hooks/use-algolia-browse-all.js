import { useAlgoliaIndex } from './use-algolia-index';

const useAlgoliaBrowseAll = ({
  indexName,
  query = '',
  hitsPerPage = 1000,
  filters,
  ...props
}) => {
  const index = useAlgoliaIndex({ indexName });

  return {
    browse: index
      ? () =>
          index.browseAll(query, {
            hitsPerPage,
            facetFilters: filters,
            ...props
          })
      : () => Promise.resolve([])
  };
};

export { useAlgoliaBrowseAll };
