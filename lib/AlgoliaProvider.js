"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlgoliaProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _AlgoliaContext = require("./AlgoliaContext");

var _useInitAlgoliaIndex = require("./hooks/use-init-algolia-index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AlgoliaProvider = function AlgoliaProvider(_ref) {
  var children = _ref.children,
      applications = _ref.applications;
  var indexes = (0, _useInitAlgoliaIndex.useInitAlgoliaIndex)(applications);
  return _react["default"].createElement(_AlgoliaContext.AlgoliaContext.Provider, {
    value: indexes
  }, children);
};

exports.AlgoliaProvider = AlgoliaProvider;