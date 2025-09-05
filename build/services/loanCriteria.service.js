"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoanCriteria = exports.getLoanCriteriaById = exports.getLoanCriteriaByBankId = exports.getAllLoanCriteria = exports.getAllBanksLoanCriteria = exports.deleteLoanCriteria = exports.createLoanCriteria = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _loanCriteria = _interopRequireDefault(require("../models/loanCriteria.model"));
var _bank = _interopRequireDefault(require("../models/bank.model"));
var _branch = _interopRequireDefault(require("../models/branch.model"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } // src/services/loanCriteria.service.js
// Import Bank and Branch if needed for validation
// Create a new loan criteria
var createLoanCriteria = exports.createLoanCriteria = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(criteriaData) {
    var bankId, branchId, loanCriteriaList, bank, branch, existingCriteria, newRecord, updatedLoanTypes, newLoanTypes, _iterator, _step, _loop, _existingCriteria$loa;
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          bankId = criteriaData.bankId, branchId = criteriaData.branchId, loanCriteriaList = criteriaData.loanCriteriaList; // 1. Validate bank and branch
          _context2.next = 4;
          return _bank["default"].findById(bankId);
        case 4:
          bank = _context2.sent;
          if (bank) {
            _context2.next = 7;
            break;
          }
          throw new Error('Bank not found');
        case 7:
          if (!branchId) {
            _context2.next = 15;
            break;
          }
          _context2.next = 10;
          return _branch["default"].findById(branchId);
        case 10:
          branch = _context2.sent;
          if (branch) {
            _context2.next = 13;
            break;
          }
          throw new Error('Branch not found');
        case 13:
          if (!(branch.bankId.toString() !== bankId)) {
            _context2.next = 15;
            break;
          }
          throw new Error('Branch does not belong to the specified bank');
        case 15:
          _context2.next = 17;
          return _loanCriteria["default"].findOne({
            bankId: bankId,
            branchId: branchId
          });
        case 17:
          existingCriteria = _context2.sent;
          if (existingCriteria) {
            _context2.next = 23;
            break;
          }
          _context2.next = 21;
          return _loanCriteria["default"].create({
            bankId: bankId,
            branchId: branchId,
            loanCriteriaList: loanCriteriaList
          });
        case 21:
          newRecord = _context2.sent;
          return _context2.abrupt("return", newRecord);
        case 23:
          // 3. Separate updates vs new loan types
          updatedLoanTypes = [];
          newLoanTypes = [];
          _iterator = _createForOfIteratorHelper(loanCriteriaList);
          _context2.prev = 26;
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
            var incoming, existing;
            return _regenerator["default"].wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  incoming = _step.value;
                  existing = existingCriteria.loanCriteriaList.find(function (c) {
                    return c.loanType === incoming.loanType;
                  });
                  if (existing) {
                    // update existing
                    existing.criteria = incoming.criteria;
                    updatedLoanTypes.push(incoming.loanType);
                  } else {
                    // add new
                    newLoanTypes.push(incoming);
                  }
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 29:
          if ((_step = _iterator.n()).done) {
            _context2.next = 33;
            break;
          }
          return _context2.delegateYield(_loop(), "t0", 31);
        case 31:
          _context2.next = 29;
          break;
        case 33:
          _context2.next = 38;
          break;
        case 35:
          _context2.prev = 35;
          _context2.t1 = _context2["catch"](26);
          _iterator.e(_context2.t1);
        case 38:
          _context2.prev = 38;
          _iterator.f();
          return _context2.finish(38);
        case 41:
          // 4. Push new loan types
          if (newLoanTypes.length > 0) {
            (_existingCriteria$loa = existingCriteria.loanCriteriaList).push.apply(_existingCriteria$loa, newLoanTypes);
          }

          // 5. Save updated document
          _context2.next = 44;
          return existingCriteria.save();
        case 44:
          return _context2.abrupt("return", {
            message: 'Loan criteria updated successfully',
            updatedLoanTypes: updatedLoanTypes,
            newLoanTypes: newLoanTypes.map(function (l) {
              return l.loanType;
            })
          });
        case 47:
          _context2.prev = 47;
          _context2.t2 = _context2["catch"](0);
          throw new Error('Error creating/updating loan criteria: ' + _context2.t2.message);
        case 50:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[0, 47], [26, 35, 38, 41]]);
  }));
  return function createLoanCriteria(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Get all loan criteria
var getAllLoanCriteria = exports.getAllLoanCriteria = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var criteria;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _loanCriteria["default"].find().populate('bankId', 'name').populate('branchId', 'name location');
        case 3:
          criteria = _context3.sent;
          return _context3.abrupt("return", criteria);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          throw new Error('Error fetching loan criteria: ' + _context3.t0.message);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getAllLoanCriteria() {
    return _ref2.apply(this, arguments);
  };
}();

// Get loan criteria by ID
var getLoanCriteriaById = exports.getLoanCriteriaById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var criteria;
    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _loanCriteria["default"].findById(id).populate('bankId', 'name').populate('branchId', 'name location');
        case 3:
          criteria = _context4.sent;
          if (criteria) {
            _context4.next = 6;
            break;
          }
          throw new Error('Loan criteria not found');
        case 6:
          return _context4.abrupt("return", criteria);
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          throw new Error('Error fetching loan criteria: ' + _context4.t0.message);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getLoanCriteriaById(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Update loan criteria by ID
var updateLoanCriteria = exports.updateLoanCriteria = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(id, updateData) {
    var bank, branch, updatedCriteria;
    return _regenerator["default"].wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!updateData.bankId) {
            _context5.next = 7;
            break;
          }
          _context5.next = 4;
          return _bank["default"].findById(updateData.bankId);
        case 4:
          bank = _context5.sent;
          if (bank) {
            _context5.next = 7;
            break;
          }
          throw new Error('Bank not found');
        case 7:
          if (!updateData.branchId) {
            _context5.next = 15;
            break;
          }
          _context5.next = 10;
          return _branch["default"].findById(updateData.branchId);
        case 10:
          branch = _context5.sent;
          if (branch) {
            _context5.next = 13;
            break;
          }
          throw new Error('Branch not found');
        case 13:
          if (!(updateData.bankId && branch.bankId.toString() !== updateData.bankId)) {
            _context5.next = 15;
            break;
          }
          throw new Error('Branch does not belong to the specified bank');
        case 15:
          _context5.next = 17;
          return _loanCriteria["default"].findByIdAndUpdate(id, updateData, {
            "new": true,
            runValidators: true
          }).populate('bankId', 'name').populate('branchId', 'name location');
        case 17:
          updatedCriteria = _context5.sent;
          if (updatedCriteria) {
            _context5.next = 20;
            break;
          }
          throw new Error('Loan criteria not found');
        case 20:
          return _context5.abrupt("return", updatedCriteria);
        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](0);
          throw new Error('Error updating loan criteria: ' + _context5.t0.message);
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee4, null, [[0, 23]]);
  }));
  return function updateLoanCriteria(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

// Delete loan criteria by ID
var deleteLoanCriteria = exports.deleteLoanCriteria = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var deletedCriteria;
    return _regenerator["default"].wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _loanCriteria["default"].findByIdAndDelete(id);
        case 3:
          deletedCriteria = _context6.sent;
          if (deletedCriteria) {
            _context6.next = 6;
            break;
          }
          throw new Error('Loan criteria not found');
        case 6:
          return _context6.abrupt("return", {
            message: 'Loan criteria deleted successfully'
          });
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          throw new Error('Error deleting loan criteria: ' + _context6.t0.message);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function deleteLoanCriteria(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

// Get loan criteria by bank ID
var getLoanCriteriaByBankId = exports.getLoanCriteriaByBankId = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(bankId) {
    var criteria;
    return _regenerator["default"].wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _loanCriteria["default"].find({
            bankId: bankId
          }).populate('bankId', 'name').populate('branchId', 'name location');
        case 3:
          criteria = _context7.sent;
          return _context7.abrupt("return", criteria);
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          throw new Error('Error fetching loan criteria: ' + _context7.t0.message);
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getLoanCriteriaByBankId(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

//getAllLoanCriteriaService
var getAllBanksLoanCriteria = exports.getAllBanksLoanCriteria = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var banks, branches, loanCriteria;
    return _regenerator["default"].wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _bank["default"].findAll();
        case 3:
          banks = _context8.sent;
          _context8.next = 6;
          return _branch["default"].find();
        case 6:
          branches = _context8.sent;
          _context8.next = 9;
          return _loanCriteria["default"].find();
        case 9:
          loanCriteria = _context8.sent;
          return _context8.abrupt("return", banks);
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          throw new Error('Error fetching loan criteria: ' + _context8.t0.message);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function getAllBanksLoanCriteria() {
    return _ref7.apply(this, arguments);
  };
}();