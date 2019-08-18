import { useRef } from 'react';
import { get } from 'lodash';

const useStateHistory = (value) => {
  const historyRef = useRef();

  historyRef.current = [...(historyRef.current || []), value];

  return {
    stateHistory: historyRef.current,
    getByIndex: (index) => get(historyRef, `current.${index}`),
    getPrevious: () => get(historyRef, `current.${historyRef.current.length - 2}`),
    getCurrent: () => get(historyRef, `current.${historyRef.current.length - 1}`)
  };
};

export { useStateHistory };