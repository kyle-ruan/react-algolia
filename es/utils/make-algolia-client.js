function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import algoliasearch from 'algoliasearch';

var makeAlgoliaClient = function makeAlgoliaClient(_ref) {
  var appId = _ref.appId,
      apiKey = _ref.apiKey;
  var algoliaClient = algoliasearch(appId, apiKey);

  var makeBrowseAll = function makeBrowseAll(_ref2) {
    var browse = _ref2.browse,
        browseFrom = _ref2.browseFrom;
    return (
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var query,
            queryParams,
            results,
            _ref4,
            cursor,
            hits,
            moveNext,
            runUntil,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
                queryParams = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {
                  hitsPerPage: 1000
                };
                results = [];
                _context2.next = 5;
                return browse(query, queryParams);

              case 5:
                _ref4 = _context2.sent;
                cursor = _ref4.cursor;
                hits = _ref4.hits;
                results.push.apply(results, _toConsumableArray(hits));

                if (cursor) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", results);

              case 11:
                moveNext =
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(cursor) {
                    var _ref6, nextCursor, nextHits, shouldStop;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return browseFrom(cursor, queryParams);

                          case 2:
                            _ref6 = _context.sent;
                            nextCursor = _ref6.cursor;
                            nextHits = _ref6.hits;
                            results.push.apply(results, _toConsumableArray(nextHits));
                            shouldStop = !nextCursor;

                            if (!shouldStop) {
                              _context.next = 9;
                              break;
                            }

                            return _context.abrupt("return");

                          case 9:
                            return _context.abrupt("return", moveNext(nextCursor));

                          case 10:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function moveNext(_x) {
                    return _ref5.apply(this, arguments);
                  };
                }();

                runUntil = function runUntil() {
                  return moveNext(cursor);
                };

                _context2.next = 15;
                return runUntil();

              case 15:
                return _context2.abrupt("return", results);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))
    );
  };

  var indexMap = {};

  var initIndex = function initIndex(indexName) {
    if (indexMap[indexName]) {
      return indexMap[indexName];
    }

    var index = algoliaClient.initIndex(indexName);
    index.browseAll = makeBrowseAll({
      browse: function browse() {
        var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var queryParams = arguments.length > 1 ? arguments[1] : undefined;
        return index.browse(query, queryParams);
      },
      browseFrom: function browseFrom(cursor) {
        return index.browseFrom(cursor);
      }
    });
    indexMap[indexName] = index;
    return indexMap[indexName];
  };

  return {
    initIndex: initIndex
  };
};

export { makeAlgoliaClient };