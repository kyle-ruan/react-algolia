import React, { useState, useEffect } from 'react';

import './App.css';
import { SearchDemo } from './example/components/search-demo';
import { AlgoliaProvider, defineAlgoliaApp } from './lib';

const {
  REACT_APP_ALGOLIA_APP_ID,
  REACT_APP_ALGOLIA_API_KEY,
  REACT_APP_ALGOLIA_INDEX_NAME
} = process.env;



const App = () => {
  const [courseIds, setCourseIds] = useState(['aws-certified-cloud-practitioner', 'aws-devops-pro']);

  return (
    <AlgoliaProvider
      applications={[
        defineAlgoliaApp(
          REACT_APP_ALGOLIA_APP_ID,
          REACT_APP_ALGOLIA_API_KEY,
          REACT_APP_ALGOLIA_INDEX_NAME
        )
      ]}
    >
      <SearchDemo />
    </AlgoliaProvider>

  );
}

export default App;
