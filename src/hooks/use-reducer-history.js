import { useState } from 'react';

const useReducerHistory = (reducer, initialValue) => {
  const [history, setHistory] = useState([initialValue]);
  const [index, setIndex] = useState(0);
  const state = history[index];

  const dispatch = (action) => {
    const newState = reducer(state, action);
    setHistory(oldHistory => oldHistory.slice(0, index + 1).concat(newState));
    setIndex(oldIndex => {
      if (oldIndex >= history.length) {
        return oldIndex;
      }
      return oldIndex + 1;
    });
  };

  let undo;
  let redo;
  if (index > 0) {
    undo = () => setIndex(oldIndex => oldIndex - 1);
  }
  if (index < history.length - 1) {
    redo = () => setIndex(oldIndex => oldIndex + 1);
  }

  return [state, dispatch, {
    history, index, setHistory, setIndex, undo, redo
  }];
}

export { useReducerHistory };