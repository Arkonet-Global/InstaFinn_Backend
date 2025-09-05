"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBank = exports.getBranchesByRoleAndUserId = exports.getBranchesByBankId = exports.getBankDataByUserId = exports.getBankById = exports.getAllBanks = exports.deleteBank = exports.createUserThenBranch = exports.createBranch = exports.createBank = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _bank = require("../services/bank.service");
// src/controllers/bank.controller.js

// Create a new bank
var createBank = exports.createBank = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var bankName, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          bankName = req.body.bankName;
          _context.next = 4;
          return (0, _bank.createBank)(bankName);
        case 4:
          result = _context.sent;
          if (!result.error) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(result.status).json({
            message: result.message
          }));
        case 7:
          return _context.abrupt("return", res.status(result.status).json({
            message: result.message,
            bank: result.bank
          }));
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function createBank(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Get all banks
var getAllBanks = exports.getAllBanks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var banks;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _bank.getAllBanks)();
        case 3:
          banks = _context2.sent;
          res.status(200).json({
            message: 'Banks fetched successfully',
            data: banks
          });
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
  return function getAllBanks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Get bank by ID
var getBankById = exports.getBankById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var bank;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _bank.getBankById)(req.params.id);
        case 3:
          bank = _context3.sent;
          res.status(200).json(bank);
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
  return function getBankById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Update bank by ID
var updateBank = exports.updateBank = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var updatedBank;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _bank.updateBank)(req.params.id, req.body);
        case 3:
          updatedBank = _context4.sent;
          res.status(200).json(updatedBank);
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
  return function updateBank(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Delete bank by ID
var deleteBank = exports.deleteBank = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _bank.deleteBank)(req.params.id);
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
  return function deleteBank(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// Create a new branch
var createBranch = exports.createBranch = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var branch;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _bank.createBranch)(req.body);
        case 3:
          branch = _context6.sent;
          res.status(201).json(branch);
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
  return function createBranch(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var createUserThenBranch = exports.createUserThenBranch = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _yield$createUserServ, user, branch;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _bank.createUserThenBranch)(req.body);
        case 3:
          _yield$createUserServ = _context7.sent;
          user = _yield$createUserServ.user;
          branch = _yield$createUserServ.branch;
          res.status(201).json({
            message: 'User and Branch created',
            user: user,
            branch: branch
          });
          _context7.next = 12;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: _context7.t0.message
          });
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function createUserThenBranch(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

// Get all branches for a bank
var getBranchesByBankId = exports.getBranchesByBankId = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var branches;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _bank.getBranchesByBankId)(req.params.bankId);
        case 3:
          branches = _context8.sent;
          res.status(200).json({
            message: 'Branches fetched successfully',
            data: branches
          });
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: _context8.t0.message
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getBranchesByBankId(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

// get Bank and Branch Data with criteria by userid
var getBankDataByUserId = exports.getBankDataByUserId = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return (0, _bank.getBankAndBranchData)(req.user.id);
        case 3:
          result = _context9.sent;
          res.status(200).json(result);
          _context9.next = 10;
          break;
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            message: _context9.t0.message
          });
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function getBankDataByUserId(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

// getBranchesByRoleAndUserId
var getBranchesByRoleAndUserId = exports.getBranchesByRoleAndUserId = /*#__PURE__*/function () {
  var _ref0 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee0(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee0$(_context0) {
      while (1) switch (_context0.prev = _context0.next) {
        case 0:
          _context0.prev = 0;
          _context0.next = 3;
          return (0, _bank.getBranchesByRoleAndUserId)(req.user.id, req.user.role, req.body);
        case 3:
          result = _context0.sent;
          res.status(200).json(result);
          _context0.next = 10;
          break;
        case 7:
          _context0.prev = 7;
          _context0.t0 = _context0["catch"](0);
          res.status(500).json({
            message: _context0.t0.message
          });
        case 10:
        case "end":
          return _context0.stop();
      }
    }, _callee0, null, [[0, 7]]);
  }));
  return function getBranchesByRoleAndUserId(_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}();