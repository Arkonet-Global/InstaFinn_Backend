"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bank = require("../controllers/bank.controller");
var _auth = require("../middlewares/auth.middleware");
var _validation = require("../middlewares/validation.middleware");
// src/routes/bank.routes.js

// Import your auth middleware
// Import validation middleware

var router = _express["default"].Router();

// Bank routes

router.post('/', _auth.authMiddleware, _validation.validateCreateBank, _bank.createBank); // Apply validation and auth
router.get('/', _auth.authMiddleware, _bank.getAllBanks);
router.get('/:id', _auth.authMiddleware, _bank.getBankById);
router.put('/:id', _auth.authMiddleware, _bank.updateBank);
router["delete"]('/:id', _auth.authMiddleware, _bank.deleteBank);

// Branch routes
router.post('/:bankId/branches', _auth.authMiddleware, _validation.validateUserBranch, _bank.createUserThenBranch);
router.get('/:bankId/branches', _auth.authMiddleware, _bank.getBranchesByBankId);

// Get Bank Data by user_id
router.get('/user/:id', _auth.authMiddleware, _bank.getBankDataByUserId);

//Get Branch data based user role and user id
router.post('/:role/:id', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'subAgent', 'admin', 'bankOperator', 'agent']), _bank.getBranchesByRoleAndUserId);
var _default = exports["default"] = router;