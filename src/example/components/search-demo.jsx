import React, { useState } from 'react';
import { useAlgoliaLazySearch } from '../../lib/hooks/use-algolia-lazy-search';

const {
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;

const SearchDemo = () => {
  const [query, setQuery] = useState();
  const [execute, { searchResults }] = useAlgoliaLazySearch({
    indexName: REACT_APP_ALGOLIA_INDEX_NAME,
    query
  });

  return (
    <div className="App">
      <div>
        <input onChange={(e) => setQuery(e.target.value)} />
        <button onClick={() => execute()}>Execute</button>
      </div>

      {searchResults && searchResults.hits.map(({ title }) => (<div key={title}>{title}</div>))}
    </div>
  )
};

export { SearchDemo };