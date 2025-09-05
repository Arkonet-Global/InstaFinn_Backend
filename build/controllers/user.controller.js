"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.sendOTPController = exports.resendOTPController = exports.loginController = exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.createUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = require("../services/user.service");
// src/controllers/user.controller.js

// Get all users
var getAllUsers = exports.getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _user.getAllUsers)(req.params.id);
        case 3:
          users = _context.sent;
          res.status(200).json(users);
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
  return function getAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Get user by ID
var getUserById = exports.getUserById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _user.getUserById)(req.params.id);
        case 3:
          user = _context2.sent;
          res.status(200).json(user);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(404).json({
            message: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getUserById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//  Login Controller (OTP Based)
// export const loginController = async (req, res) => {
//     const { email, otp } = req.body;

//     try {
//         const {user, token} = await verifyOTPService(email, otp);
//         res.status(200).json({ message: 'User logged in successfully', token, user });

//     } catch (error) {
//         res.status(401).json({ message: error.message }); //  Use 401 for authentication errors
//     }
// };

// Controller for sending OTP
// export const sendOTPController = async (req, res) => {
//     const { mobileNumber,otp } = req.body;

//     try {
//         const { otp, mobileNumber: userMobileNumber } = await sendOTPService(mobileNumber);
//         res.status(200).json({ message: 'OTP sent successfully', mobileNumber: userMobileNumber, otp: otp }); //  IMPORTANT:  Do NOT send the OTP back in the response in a real application
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// sendOTPController
// export const sendOTPController = async (req, res) => {
//     const { email } = req.body;
//     console.log("📩 Incoming email for OTP:", email);

//     try {
//         const result = await sendOTPService(email);
//         res.status(200).json({ message: 'OTP sent successfully', emailSent: result.emailSent });
//     } catch (error) {
//         console.error("❌ sendOTPController error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

var loginController = exports.loginController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, mobileNumber, otp, _yield$verifyOTPServi, user, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, mobileNumber = _req$body.mobileNumber, otp = _req$body.otp;
          _context3.prev = 1;
          _context3.next = 4;
          return (0, _user.verifyOTP)(mobileNumber, otp);
        case 4:
          _yield$verifyOTPServi = _context3.sent;
          user = _yield$verifyOTPServi.user;
          token = _yield$verifyOTPServi.token;
          res.status(200).json({
            message: 'User logged in successfully',
            token: token,
            user: user
          });
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(401).json({
            message: _context3.t0.message
          }); // Use 401 for authentication errors
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function loginController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var sendOTPController = exports.sendOTPController = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var mobileNumber, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          mobileNumber = req.body.mobileNumber;
          console.log("📩 Incoming mobile number for OTP:", mobileNumber);
          _context4.prev = 2;
          _context4.next = 5;
          return (0, _user.sendOTP)(mobileNumber);
        case 5:
          result = _context4.sent;
          res.status(200).json({
            message: 'OTP sent successfully',
            mobileNumber: result.mobileNumber
          });
          _context4.next = 13;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](2);
          console.error("❌ sendOTPController error:", _context4.t0);
          res.status(500).json({
            message: _context4.t0.message
          });
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return function sendOTPController(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Controller for resending OTP
// export const resendOTPController = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const result = await sendOTPService(email);
//         res.status(200).json({
//             message: 'OTP resent successfully',
//             emailSent: result.emailSent
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

var resendOTPController = exports.resendOTPController = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var mobileNumber;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          mobileNumber = req.body.mobileNumber;
          _context5.prev = 1;
          _context5.next = 4;
          return (0, _user.resendOTP)(mobileNumber);
        case 4:
          res.status(200).json({
            message: 'OTP resent successfully'
          });
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            message: _context5.t0.message
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 7]]);
  }));
  return function resendOTPController(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// Create a new user
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _yield$createUserServ, user, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _user.createUser)(req.body);
        case 3:
          _yield$createUserServ = _context6.sent;
          user = _yield$createUserServ.user;
          token = _yield$createUserServ.token;
          res.status(201).json({
            message: 'User Created Successfully',
            user: user,
            token: token
          });
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: _context6.t0.message
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function createUser(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

// Update user by ID
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var updatedUser;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _user.updateUser)(req.params.id, req.body);
        case 3:
          updatedUser = _context7.sent;
          res.status(200).json(updatedUser);
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(404).json({
            message: _context7.t0.message
          });
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function updateUser(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

// Delete user by ID
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _user.deleteUser)(req.params.id);
        case 3:
          result = _context8.sent;
          res.status(200).json(result);
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(404).json({
            message: _context8.t0.message
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function deleteUser(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();