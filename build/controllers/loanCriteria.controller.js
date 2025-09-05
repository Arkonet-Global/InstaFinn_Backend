"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoanCriteria = exports.getLoanCriteriaForAllBanks = exports.getLoanCriteriaById = exports.getLoanCriteriaByBankId = exports.getAllLoanCriteria = exports.deleteLoanCriteria = exports.createLoanCriteria = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _loanCriteria = require("../services/loanCriteria.service");
// src/controllers/loanCriteria.controller.js

// Create a new loan criteria
var createLoanCriteria = exports.createLoanCriteria = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var criteria;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _loanCriteria.createLoanCriteria)(req.body);
        case 3:
          criteria = _context.sent;
          res.status(201).json(criteria);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createLoanCriteria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Get all loan criteria
var getAllLoanCriteria = exports.getAllLoanCriteria = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var criteria;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _loanCriteria.getAllLoanCriteria)();
        case 3:
          criteria = _context2.sent;
          res.status(200).json(criteria);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getAllLoanCriteria(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Get loan criteria by ID
var getLoanCriteriaById = exports.getLoanCriteriaById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var criteria;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _loanCriteria.getLoanCriteriaById)(req.params.id);
        case 3:
          criteria = _context3.sent;
          res.status(200).json(criteria);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(404).json({
            message: _context3.t0.message
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getLoanCriteriaById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Update loan criteria by ID
var updateLoanCriteria = exports.updateLoanCriteria = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var updatedCriteria;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _loanCriteria.updateLoanCriteria)(req.params.id, req.body);
        case 3:
          updatedCriteria = _context4.sent;
          res.status(200).json(updatedCriteria);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(404).json({
            message: _context4.t0.message
          });
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function updateLoanCriteria(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Delete loan criteria by ID
var deleteLoanCriteria = exports.deleteLoanCriteria = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _loanCriteria.deleteLoanCriteria)(req.params.id);
        case 3:
          result = _context5.sent;
          res.status(200).json(result);
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(404).json({
            message: _context5.t0.message
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function deleteLoanCriteria(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// Get loan criteria by bank ID
var getLoanCriteriaByBankId = exports.getLoanCriteriaByBankId = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var criteria;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _loanCriteria.getLoanCriteriaByBankId)(req.params.bankId);
        case 3:
          criteria = _context6.sent;
          res.status(200).json(criteria);
          _context6.next = 10;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: _context6.t0.message
          });
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getLoanCriteriaByBankId(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

//getLoanCriteriaForAllBanks 
var getLoanCriteriaForAllBanks = exports.getLoanCriteriaForAllBanks = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var criteria;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log('entered');
          _context7.prev = 1;
          console.log('getLoanCriteriaForAllBanks');
          _context7.next = 5;
          return (0, _loanCriteria.getAllBanksLoanCriteria)();
        case 5:
          criteria = _context7.sent;
          res.status(200).json(criteria);
          _context7.next = 12;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json({
            message: _context7.t0.message
          });
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 9]]);
  }));
  return function getLoanCriteriaForAllBanks(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();