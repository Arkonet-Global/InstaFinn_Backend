"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../middlewares/auth.middleware");
var _other = require("../controllers/other.controller");
// Import your auth middleware

var router = _express["default"].Router();
router.get('/applicationStatus', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator', 'agent', 'subAgent']), _other.getLoanApplicationStatus); // get application status
var _default = exports["default"] = router;