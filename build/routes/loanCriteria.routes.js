"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _loanCriteria = require("../controllers/loanCriteria.controller");
var _auth = require("../middlewares/auth.middleware");
var _validation = require("../middlewares/validation.middleware");
// src/routes/loanCriteria.routes.js

// Import your auth middleware

var router = _express["default"].Router();

// Routes
router.post('/', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator']), _validation.validateCreateLoanCriteria, _loanCriteria.createLoanCriteria);
router.get('/', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator']), _loanCriteria.getAllLoanCriteria);
router.get('/:id', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator']), _loanCriteria.getLoanCriteriaById);
router.put('/:id', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator']), _validation.validateUpdateLoanCriteria, _loanCriteria.updateLoanCriteria);
router["delete"]('/:id', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator']), _loanCriteria.deleteLoanCriteria);
router.get('/bank/:bankId', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator']), _loanCriteria.getLoanCriteriaByBankId);
//fetch all loan criteria based on bank and branch
router.get('/banks/data', _auth.authMiddleware, _loanCriteria.getLoanCriteriaForAllBanks);
var _default = exports["default"] = router;