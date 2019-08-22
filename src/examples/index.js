import React, { useState, useEffect } from 'react';
import { GetObjects } from './GetObjects';

const OBJECT_IDS = ['aws-devops-pro', 'aws-csysops'];

const Example = () => {
  const [objectIds, setObjectIds] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setObjectIds(OBJECT_IDS)
    }, 300)
  }, []);
  return <GetObjects objectIds={objectIds} />
}

export { Example };