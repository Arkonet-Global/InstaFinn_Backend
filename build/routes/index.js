"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./user.routes"));
var _bank = _interopRequireDefault(require("./bank.routes"));
var _loanApplication = _interopRequireDefault(require("./loanApplication.routes"));
var _loanCriteria = _interopRequireDefault(require("./loanCriteria.routes"));
var _other = _interopRequireDefault(require("./other.routes"));
var _upload = _interopRequireDefault(require("./upload.routes"));
var router = _express["default"].Router();

// Import loanCriteria routes

/**
 * Function contains Application routes
 *
 * @returns router
 */
var routes = function routes() {
  router.get('/', function (req, res) {
    res.json('Welcome');
  });
  router.use('/users', _user["default"]);
  router.use('/banks', _bank["default"]); // Mount bank routes
  router.use('/loans', _loanApplication["default"]); // Mount loan application routes
  router.use('/criteria', _loanCriteria["default"]); // Mount loan criteria routes
  router.use('/other', _other["default"]);
  router.use('/api', _upload["default"]);
  return router;
};
var _default = exports["default"] = routes;