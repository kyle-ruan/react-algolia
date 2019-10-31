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
### get index
```javascript
import { useAlgoliaIndex } from 'react-algolia';

const GetIndexExample = () => {
  const index = useAlgoliaIndex({
    indexName: 'index-name'
  });

  return (
    <div>
      Get Index Example
      <button onClick={() => {
        if (index) {
          console.log('got index instance', index)
        }
      }}>Get Index</button>
    </div>
  )
}
```

#### get object
```javascript
import { useAlgoliaGetObject } from 'react-algolia';

const GetObjectExample = () => {
  const { object, loading, error, index } = useAlgoliaGetObject({
    indexName: 'index-name',
    objectId: 'algolia-object-id',
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

const LazyGetObjectExample = () => {
  const [execute, { object, loading, error, index }] = useAlgoliaLazyGetObject({
    indexName: 'index-name',
    objectId: 'algolia-object-id',
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

const GetObjectsExample = () => {
  const { objects, loading, error, index } = useAlgoliaGetObjects({
    indexName: 'index-name',
    objectIds: ['algolia-object-ids'],
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

const LazyGetObjectsExample = () => {
  const [execute, { objects, loading, error, index }] = useAlgoliaLazyGetObjects({
    indexName: 'index-name',
    objectIds: ['algolia-object-ids'],
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

const SearchExample = () => {
  const {
    searchResults,
    loading,
    error,
    index
  } = useAlgoliaSearch({
    indexName: 'index-name',
    query: 'keyword', // query string to search
    page: 0, // page number starts from  0
    hitsPerPage: 10, // page size: default to be 10
    filters: 'deleted:false' // filters,
    delay: 300 // debounce ms between query value changes,
    key: 0 // query key, pass a new value will invalidate cache of this index and initiate a new search
  });

  return (
    <div>Search Example</div>
  );
};
```

### lazy search
```javascript
import { useAlgoliaLazySearch } from 'react-algolia';

const LazySearchExample = () => {
  const [
    execute,
    { searchResults, loading, error, index }
  ] = useAlgoliaLazySearch({
    indexName: 'index-name',
    query: 'keyword', // query string to search
    page: 0, // page number starts from  0
    hitsPerPage: 10, // page size: default to be 10
    filters: 'deleted:false' // filters,
    delay: 300 // debounce ms between query value changes,
    key: 0 // query key, pass a new value will invalidate cache of this index and initiate a new search
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
  // browse the whole index (not limited to 1000 objects per request)
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