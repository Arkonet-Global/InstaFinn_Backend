"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBank = exports.getBranchesByRoleAndUserId = exports.getBranchesByBankId = exports.getBankById = exports.getBankAndBranchData = exports.getAllBanks = exports.deleteBank = exports.createUserThenBranch = exports.createBranch = exports.createBank = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bank = _interopRequireDefault(require("../models/bank.model"));
var _branch = _interopRequireDefault(require("../models/branch.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _loanCriteria = _interopRequireDefault(require("../models/loanCriteria.model"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // src/services/bank.service.js
// services/bank.service.js
var createBank = exports.createBank = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(bankName) {
    var isBankExist, newBank;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _bank["default"].findOne({
            bankName: bankName
          });
        case 3:
          isBankExist = _context.sent;
          if (!isBankExist) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", {
            error: false,
            status: 400,
            message: 'Bank name already exists'
          });
        case 6:
          newBank = new _bank["default"]({
            bankName: bankName
          });
          _context.next = 9;
          return newBank.save();
        case 9:
          return _context.abrupt("return", {
            error: false,
            status: 201,
            bank: newBank,
            message: 'Bank created successfully'
          });
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          if (!(_context.t0.code === 11000)) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", {
            error: false,
            status: 400,
            message: 'Bank name already exists'
          });
        case 16:
          return _context.abrupt("return", {
            error: true,
            status: 500,
            message: 'Server error'
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function createBank(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Get all banks
var getAllBanks = exports.getAllBanks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var banks, i, branchCount;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _bank["default"].find().lean();
        case 3:
          banks = _context2.sent;
          i = 0;
        case 5:
          if (!(i < banks.length)) {
            _context2.next = 13;
            break;
          }
          _context2.next = 8;
          return _branch["default"].countDocuments({
            bankId: banks[i]._id
          });
        case 8:
          branchCount = _context2.sent;
          banks[i].branchCount = branchCount;
        case 10:
          i++;
          _context2.next = 5;
          break;
        case 13:
          return _context2.abrupt("return", banks);
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          throw new Error('Error fetching banks: ' + _context2.t0.message);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function getAllBanks() {
    return _ref2.apply(this, arguments);
  };
}();

// Get bank by ID
var getBankById = exports.getBankById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var bank;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _bank["default"].findById(id).populate('branches');
        case 3:
          bank = _context3.sent;
          if (bank) {
            _context3.next = 6;
            break;
          }
          throw new Error('Bank not found');
        case 6:
          return _context3.abrupt("return", bank);
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          throw new Error('Error fetching bank: ' + _context3.t0.message);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getBankById(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Update bank by ID
var updateBank = exports.updateBank = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(id, updateData) {
    var updatedBank;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _bank["default"].findByIdAndUpdate(id, updateData, {
            "new": true,
            runValidators: true
          });
        case 3:
          updatedBank = _context4.sent;
          if (updatedBank) {
            _context4.next = 6;
            break;
          }
          throw new Error('Bank not found');
        case 6:
          return _context4.abrupt("return", updatedBank);
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          throw new Error('Error updating bank: ' + _context4.t0.message);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function updateBank(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

// Delete bank by ID
var deleteBank = exports.deleteBank = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var deletedBank;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _bank["default"].findByIdAndDelete(id);
        case 3:
          deletedBank = _context5.sent;
          if (deletedBank) {
            _context5.next = 6;
            break;
          }
          throw new Error('Bank not found');
        case 6:
          return _context5.abrupt("return", {
            message: 'Bank deleted successfully'
          });
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          throw new Error('Error deleting bank: ' + _context5.t0.message);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function deleteBank(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

// Create a new branch
var createBranch = exports.createBranch = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(branchData) {
    var branch;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _branch["default"].create(branchData);
        case 3:
          branch = _context6.sent;
          _context6.next = 6;
          return _bank["default"].findByIdAndUpdate(branchData.bankId, {
            $push: {
              branches: branch._id
            }
          });
        case 6:
          return _context6.abrupt("return", branch);
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          throw new Error('Error creating branch: ' + _context6.t0.message);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function createBranch(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

// export const createUserThenBranch = async (data) => {
//   try {
//     const { email } = data;
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       throw new Error('Email already exists');
//     }
//     const isIFSCExist = await Branch.findOne({ ifscCode: data.ifscCode });
//     if (isIFSCExist) {
//       throw new Error('IFSC already exists');
//     }

//     const user = await User.create(data);
//     const branch = await Branch.create({ ...data, userId: user._id });

//     return { user, branch };
//   } catch (error) {
//     if (error.code === 11000) {
//       throw new Error('Email or mobile number already exists' + error.message);
//     }
//     throw new Error('Error creating user: ' + error.message);
//   }
// };

// Get all branches for a bank

var createUserThenBranch = exports.createUserThenBranch = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(data) {
    var email, existingUser, isIFSCExist, user, branch;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          email = data.email;
          _context7.next = 4;
          return _user["default"].findOne({
            email: email
          });
        case 4:
          existingUser = _context7.sent;
          if (!existingUser) {
            _context7.next = 7;
            break;
          }
          throw new Error('Email already exists');
        case 7:
          _context7.next = 9;
          return _branch["default"].findOne({
            ifscCode: data.ifscCode
          });
        case 9:
          isIFSCExist = _context7.sent;
          if (!isIFSCExist) {
            _context7.next = 12;
            break;
          }
          throw new Error('IFSC already exists');
        case 12:
          _context7.next = 14;
          return _user["default"].create(_objectSpread(_objectSpread({}, data), {}, {
            branches: []
          }));
        case 14:
          user = _context7.sent;
          _context7.next = 17;
          return _branch["default"].create(_objectSpread(_objectSpread({}, data), {}, {
            userId: user._id
          }));
        case 17:
          branch = _context7.sent;
          _context7.next = 20;
          return _user["default"].findByIdAndUpdate(user._id, {
            $push: {
              branches: branch._id
            }
          });
        case 20:
          return _context7.abrupt("return", {
            user: user,
            branch: branch
          });
        case 23:
          _context7.prev = 23;
          _context7.t0 = _context7["catch"](0);
          if (!(_context7.t0.code === 11000)) {
            _context7.next = 27;
            break;
          }
          throw new Error('Email or mobile number already exists' + _context7.t0.message);
        case 27:
          throw new Error('Error creating user: ' + _context7.t0.message);
        case 28:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 23]]);
  }));
  return function createUserThenBranch(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var getBranchesByBankId = exports.getBranchesByBankId = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(bankId) {
    var branches;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _branch["default"].find({
            bankId: bankId
          });
        case 3:
          branches = _context8.sent;
          return _context8.abrupt("return", branches);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          throw new Error('Error fetching branches: ' + _context8.t0.message);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getBranchesByBankId(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

//Get bank data and branch data with criteria based on user_id
var getBankAndBranchData = exports.getBankAndBranchData = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(userId) {
    var branch, newbranch, criteria, newCriteria;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _branch["default"].find();
        case 3:
          branch = _context9.sent;
          newbranch = branch.filter(function (branch) {
            return branch.userId == userId;
          }); // const allBranches = await Branch.findAll();
          _context9.next = 7;
          return _loanCriteria["default"].find();
        case 7:
          criteria = _context9.sent;
          newCriteria = criteria.filter(function (criteria) {
            return criteria.branchId == newbranch[0]._id;
          }); // return { bank, branch, criteria };
          return _context9.abrupt("return", {
            newbranch: newbranch,
            newCriteria: newCriteria
          });
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          throw new Error('Error fetching bank and branch data: ' + _context9.t0.message);
        case 15:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 12]]);
  }));
  return function getBankAndBranchData(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

// export const getBankAndBranchData = async (userId) => {
//   try {
//     console.log('getBankAndBranchData called with userId:', userId); // <--- Add this
//     const branches = await Branch.find({ userId }).populate('bankId', 'bankName');
//     console.log('branches:', branches); // <--- Add this

//     const result = await Promise.all(
//       branches.map(async (branch) => {
//         const criteriaList = await LoanCriteria.find({ branchId: branch._id });
//         return {
//           branchId: branch._id,
//           branchName: branch.bankBranch,
//           bankId: branch.bankId?._id,
//           bankName: branch.bankId?.bankName || '',
//           criteria: criteriaList.map(c => ({
//             ...c.toObject(),
//             criteria: c.loanCriteriaList || []
//           }))
//         };
//       })
//     );
//     console.log('result:', result); // <--- Add this

//     return result;
//   } catch (error) {
//     console.error('Error in getBankAndBranchData:', error); // <--- Add this
//     throw new Error('Error fetching bank and branch data: ' + error.message);
//   }
// };

// getBranchesByRoleAndUserId

// export const getBranchesByRoleAndUserId = async (userId, role) => {
//   try {
//     const normalizedRole = role?.toLowerCase();

//     if (['admin', 'superadmin', 'subagent', 'agent', 'masteradmin'].includes(normalizedRole)) {
//       const allBanks = await Bank.find();
//       const branchesData = [];

//       for (const bank of allBanks) {
//         const branches = await Branch.find({ bankId: bank._id }).populate('bankId', 'bankName');

//         for (const branch of branches) {
//           const loanCriteria = await LoanCriteria.findOne({
//             bankId: bank._id,
//             branchId: branch._id
//           });

//           branchesData.push({
//             ...branch.toObject(),
//             bankName: branch.bankId?.bankName || '',
//             criteria: loanCriteria?.loanCriteriaList || []
//           });
//         }
//       }
//       console.log('Branches data:', branchesData);
//       return branchesData;
//     } else {
//       const branches = await Branch.find({ userId });
//       console.log('Branches for user:', branches);
//       const branchesWithCriteria = await Promise.all(
//         branches.map(async (branch) => {
//           const loanCriteria = await LoanCriteria.findOne({
//             bankId: branch.bankId,
//             branchId: branch._id
//           });

//           return {
//             ...branch.toObject(),
//             criteria: loanCriteria?.loanCriteriaList || []
//           };
//         })
//       );

//       return branchesWithCriteria;
//     }
//   } catch (error) {
//     throw new Error('Error fetching branches: ' + error.message);
//   }
// };

var getBranchesByRoleAndUserId = exports.getBranchesByRoleAndUserId = /*#__PURE__*/function () {
  var _ref0 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee1(userId, role, body) {
    var normalizedRole, isElevatedRole, branchesData, allBanks, _iterator, _step, bank, branches, _iterator2, _step2, _branch$bankId, branch, loanCriteria, _branches, index, previousFive, current, nextFive, selectedIds, remaining, finalOrderedList;
    return _regenerator["default"].wrap(function _callee1$(_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          _context1.prev = 0;
          normalizedRole = role === null || role === void 0 ? void 0 : role.toLowerCase();
          isElevatedRole = ['admin', 'superadmin', 'subagent', 'agent', 'masteradmin'].includes(normalizedRole);
          branchesData = [];
          if (!isElevatedRole) {
            _context1.next = 47;
            break;
          }
          _context1.next = 7;
          return _bank["default"].find();
        case 7:
          allBanks = _context1.sent;
          _iterator = _createForOfIteratorHelper(allBanks);
          _context1.prev = 9;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context1.next = 37;
            break;
          }
          bank = _step.value;
          _context1.next = 15;
          return _branch["default"].find({
            bankId: bank._id
          }).populate('bankId', 'bankName');
        case 15:
          branches = _context1.sent;
          _iterator2 = _createForOfIteratorHelper(branches);
          _context1.prev = 17;
          _iterator2.s();
        case 19:
          if ((_step2 = _iterator2.n()).done) {
            _context1.next = 27;
            break;
          }
          branch = _step2.value;
          _context1.next = 23;
          return _loanCriteria["default"].findOne({
            bankId: bank._id,
            branchId: branch._id
          });
        case 23:
          loanCriteria = _context1.sent;
          branchesData.push(_objectSpread(_objectSpread({}, branch.toObject()), {}, {
            bankName: ((_branch$bankId = branch.bankId) === null || _branch$bankId === void 0 ? void 0 : _branch$bankId.bankName) || '',
            criteria: (loanCriteria === null || loanCriteria === void 0 ? void 0 : loanCriteria.loanCriteriaList) || []
          }));
        case 25:
          _context1.next = 19;
          break;
        case 27:
          _context1.next = 32;
          break;
        case 29:
          _context1.prev = 29;
          _context1.t0 = _context1["catch"](17);
          _iterator2.e(_context1.t0);
        case 32:
          _context1.prev = 32;
          _iterator2.f();
          return _context1.finish(32);
        case 35:
          _context1.next = 11;
          break;
        case 37:
          _context1.next = 42;
          break;
        case 39:
          _context1.prev = 39;
          _context1.t1 = _context1["catch"](9);
          _iterator.e(_context1.t1);
        case 42:
          _context1.prev = 42;
          _iterator.f();
          return _context1.finish(42);
        case 45:
          _context1.next = 53;
          break;
        case 47:
          _context1.next = 49;
          return _branch["default"].find({
            userId: userId
          });
        case 49:
          _branches = _context1.sent;
          _context1.next = 52;
          return Promise.all(_branches.map(/*#__PURE__*/function () {
            var _ref1 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee0(branch) {
              var loanCriteria;
              return _regenerator["default"].wrap(function _callee0$(_context0) {
                while (1) switch (_context0.prev = _context0.next) {
                  case 0:
                    _context0.next = 2;
                    return _loanCriteria["default"].findOne({
                      bankId: branch.bankId,
                      branchId: branch._id
                    });
                  case 2:
                    loanCriteria = _context0.sent;
                    return _context0.abrupt("return", _objectSpread(_objectSpread({}, branch.toObject()), {}, {
                      criteria: (loanCriteria === null || loanCriteria === void 0 ? void 0 : loanCriteria.loanCriteriaList) || []
                    }));
                  case 4:
                  case "end":
                    return _context0.stop();
                }
              }, _callee0);
            }));
            return function (_x11) {
              return _ref1.apply(this, arguments);
            };
          }()));
        case 52:
          branchesData = _context1.sent;
        case 53:
          // ✅ Step 1: Sort all branches by bankPin
          branchesData.sort(function (a, b) {
            return a.bankPin.localeCompare(b.bankPin);
          });

          // ✅ Step 2: Find and organize by applicantPin
          if (!(body !== null && body !== void 0 && body.applicantPin)) {
            _context1.next = 68;
            break;
          }
          index = branchesData.findIndex(function (branch) {
            return branch.bankPin === body.applicantPin;
          });
          if (!(index !== -1)) {
            _context1.next = 66;
            break;
          }
          previousFive = branchesData.slice(Math.max(0, index - 5), index);
          current = branchesData[index];
          nextFive = branchesData.slice(index + 1, index + 6);
          selectedIds = new Set([].concat((0, _toConsumableArray2["default"])(previousFive.map(function (b) {
            return b._id.toString();
          })), [current._id.toString()], (0, _toConsumableArray2["default"])(nextFive.map(function (b) {
            return b._id.toString();
          }))));
          remaining = branchesData.filter(function (branch) {
            return !selectedIds.has(branch._id.toString());
          });
          finalOrderedList = [].concat((0, _toConsumableArray2["default"])(previousFive), [current], (0, _toConsumableArray2["default"])(nextFive), (0, _toConsumableArray2["default"])(remaining));
          return _context1.abrupt("return", finalOrderedList);
        case 66:
          console.warn("applicantPin '".concat(body.applicantPin, "' not found."));
          return _context1.abrupt("return", branchesData);
        case 68:
          return _context1.abrupt("return", branchesData);
        case 71:
          _context1.prev = 71;
          _context1.t2 = _context1["catch"](0);
          throw new Error('Error fetching branches: ' + _context1.t2.message);
        case 74:
        case "end":
          return _context1.stop();
      }
    }, _callee1, null, [[0, 71], [9, 39, 42, 45], [17, 29, 32, 35]]);
  }));
  return function getBranchesByRoleAndUserId(_x0, _x1, _x10) {
    return _ref0.apply(this, arguments);
  };
}();