"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOtherService = exports.getOtherByIdService = exports.getLoanApplicationStatus = exports.deleteOtherService = exports.createOtherService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _otherService = require("../services/other.service.js");
var _loanApplicationModel = _interopRequireDefault(require("../models/loanApplication.model.js"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// export const getLoanApplicationStatus = async (req, res) => {
//     try {
//         const other = await getLoanApplicationStatusService(req.user.id, req.user.role);
//         //res.status(200).json({message: 'Loan application status retrieved successfully', data: other});
//         res.status(200).json({message: 'Data Fetched Successfully', data: other});
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getLoanApplicationStatus = async (req, res) => {
//   try {
//     const userId = req.user.id || req.user._id;
//     const role = req.user.role;
//     const branches = req.user.branches || (req.user.branchId ? [req.user.branchId] : []);

//     const result = await getLoanApplicationStatusService(userId, role, branches);
//     res.status(200).json({ message: 'Data Fetched Successfully', data: result });
//   } catch (error) {
//     console.error("❌ Status Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

var getLoanApplicationStatus = exports.getLoanApplicationStatus = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$user, id, role, _req$user$branches, branches, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$user = req.user, id = _req$user.id, role = _req$user.role, _req$user$branches = _req$user.branches, branches = _req$user$branches === void 0 ? [] : _req$user$branches; // `branches` must be available on req.user
          _context.next = 4;
          return (0, _otherService.getLoanApplicationStatus)(id, role, branches);
        case 4:
          result = _context.sent;
          console.log("📊 Status counts response:", result);
          res.status(200).json({
            message: 'Application status counts fetched',
            data: result
          });
          _context.next = 13;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("🔴 Status count error:", _context.t0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getLoanApplicationStatus(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getOtherByIdService = exports.getOtherByIdService = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, other;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return OtherService.findById(id).populate('createdBy', 'name');
        case 4:
          other = _context2.sent;
          if (other) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Other not found'
          }));
        case 7:
          res.status(200).json(other);
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getOtherByIdService(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createOtherService = exports.createOtherService = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var other;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return OtherService.create(_objectSpread(_objectSpread({}, req.body), {}, {
            createdBy: req.user.id
          }));
        case 3:
          other = _context3.sent;
          res.status(201).json(other);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function createOtherService(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateOtherService = exports.updateOtherService = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, other;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return OtherService.findByIdAndUpdate(id, req.body, {
            "new": true
          });
        case 4:
          other = _context4.sent;
          if (other) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Other not found'
          }));
        case 7:
          res.status(200).json(other);
          _context4.next = 13;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function updateOtherService(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteOtherService = exports.deleteOtherService = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, other;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return OtherService.findByIdAndRemove(id);
        case 4:
          other = _context5.sent;
          if (other) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Other not found'
          }));
        case 7:
          res.status(200).json({
            message: 'Other deleted successfully'
          });
          _context5.next = 13;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function deleteOtherService(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();