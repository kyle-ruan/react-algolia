import React from 'react';
import { AlgoliaContext } from './AlgoliaContext';
import { useInitAlgoliaIndex } from './hooks/use-init-algolia-index';

var AlgoliaProvider = function AlgoliaProvider(_ref) {
  var children = _ref.children,
      applications = _ref.applications;
  var indexes = useInitAlgoliaIndex(applications);
  return React.createElement(AlgoliaContext.Provider, {
    value: indexes
  }, children);
};

export { AlgoliaProvider };