import React, { useState } from 'react';
import { GetObject } from './get-object';
import { GetObjects } from './get-objects';


const Examples = {
  'get-object': <GetObject />,
  'get-objects': <GetObjects />
};

const Example = () => {
  const [example, setExample] = useState('get-object');

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <select onChange={(e) => setExample(e.target.value)}>
          <option value="get-object">Get Object</option>
          <option value="get-objects">Get Objects</option>
        </select>
      </div>

      <div>
        {Examples[example]}
      </div>
    </div>
  )
}

export { Example };