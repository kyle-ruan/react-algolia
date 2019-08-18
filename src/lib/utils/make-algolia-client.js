import algoliasearch from 'algoliasearch';

const makeAlgoliaClient = ({ appId, apiKey }) => {
  const algoliaClient = algoliasearch(appId, apiKey);

  const makeBrowseAll = ({ browse, browseFrom }) => async (
    query = '',
    queryParams = {
      hitsPerPage: 1000
    }
  ) => {
    const results = [];

    const { cursor, hits } = await browse(query, queryParams);

    results.push(...hits);

    if (!cursor) {
      return results;
    }

    const moveNext = async cursor => {
      const { cursor: nextCursor, hits: nextHits } = await browseFrom(
        cursor,
        queryParams
      );

      results.push(...nextHits);

      const shouldStop = !nextCursor;

      if (shouldStop) {
        return;
      }

      return moveNext(nextCursor);
    };

    const runUntil = () => {
      return moveNext(cursor);
    };

    await runUntil();

    return results;
  };

  const indexMap = {};

  const initIndex = indexName => {
    if (indexMap[indexName]) {
      return indexMap[indexName];
    }

    const index = algoliaClient.initIndex(indexName);

    index.browseAll = makeBrowseAll({
      browse: (query = '', queryParams) => index.browse(query, queryParams),
      browseFrom: cursor => index.browseFrom(cursor)
    });
    indexMap[indexName] = index;
    return indexMap[indexName];
  };

  return { initIndex };
};

export { makeAlgoliaClient };