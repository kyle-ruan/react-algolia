# React Algolia

### Config
```javascript
import { AlgoliaProvider, defineAlgoliaApp } from 'react-algolia';

const App = () => (
  <AlgoliaProvider
    applications={[
      defineAlgoliaApp(
        APP_APPLICATION_ID,
        API_KEY,
        INDEX_NAME
      ),
      defineAlgoliaApp(
        ANOTHER_APP_APPLICATION_ID,
        ANOTHER_API_KEY,
        ANOTHER_INDEX_NAME
      )
    ]}
  >
    <Main />
  </AlgoliaProvider>
)
```

### Usage
#### get object
```javascript
import { useAlgoliaGetObject } from 'react-algolia';

const GetObjectExample = ({ objectId }) => {
  const { object, loading, error } = useAlgoliaGetObject({
    indexName: 'index-name',
    objectId,
    fields: ['objectID', 'name']
  });

  return (
    <div>Get Object Example</div>
  );
};
```

#### lazy get object
```javascript
import { useAlgoliaLazyGetObject } from 'react-algolia';

const LazyGetObjectExample = ({ objectId }) => {
  const [execute, { object, loading, error }] = useAlgoliaLazyGetObject({
    indexName: 'index-name',
    objectId,
    fields: ['objectID', 'name']
  });

  return (
    <div>
      Lazy Get Object Example
      <button onClick={() => execute()}>Get Object</button>
    </div>
  );
};
```

#### get objects
```javascript
import { useAlgoliaGetObjects } from 'react-algolia';

const GetObjectsExample = ({ objectIds }) => {
  const { objects, loading, error } = useAlgoliaGetObjects({
    indexName: 'index-name',
    objectIds,
    fields: ['objectID', 'name']
  });

  return (
    <div>Get Objects Example</div>
  );
};
```

#### lazy get objects
```javascript
import { useAlgoliaLazyGetObjects } from 'react-algolia';

const LazyGetObjectsExample = ({ objectIds }) => {
  const [execute, { objects, loading, error }] = useAlgoliaLazyGetObjects({
    indexName: 'index-name',
    objectIds,
    fields: ['objectID', 'name']
  });

  return (
    <div>
      Lazy Get Objects Example
      <button onClick={() => execute()}>Lazy Get Objects</button>
    </div>
  );
};
```

### search
```javascript
import { useAlgoliaSearch } from 'react-algolia';

const SearchExample = ({ query, page, hitsPerPage }) => {
  const { searchResults, loading, error } = useAlgoliaGetObjects({
    indexName: 'index-name',
    page,
    hitsPerPage,
    filters: 'deleted:false'
  });

  return (
    <div>Search Example</div>
  );
};
```

### lazy search
```javascript
import { useAlgoliaLazySearch } from 'react-algolia';

const LazySearchExample = ({ query, page, hitsPerPage }) => {
  const [execute, { searchResults, loading, error }] = useAlgoliaLazySearch({
    indexName: 'index-name',
    page,
    hitsPerPage,
    filters: 'deleted:false'
  });

  return (
    <div>
      Lazy Search Example
      <button onClick={() => execute()}>Search</button>
    </div>
  );
};
```


### browse index
```javascript
import { useAlgoliaBrowseAll } from 'react-algolia';

const BrowseExample = () => {
  const { browse } = useAlgoliaBrowseAll({
    indexName: 'index-name',
    filters: 'deleted:false'
  });

  return (
    <div>
      Browse Example
      <button onClick={() => browse()}>Browse</button>
    </div>
  );
};
```