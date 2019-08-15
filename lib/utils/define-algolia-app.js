"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineAlgoliaApp = void 0;

var defineAlgoliaApp = function defineAlgoliaApp(applicationId, apiKey, indexName) {
  return {
    applicationId: applicationId,
    apiKey: apiKey,
    indexName: indexName
  };
};

exports.defineAlgoliaApp = defineAlgoliaApp;