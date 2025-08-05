"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOTP = exports.updateUser = exports.sendOTP = exports.getUserById = exports.getAllUsers = exports.findUserByMobileNumber = exports.deleteUser = exports.createUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bank = require("../models/bank.model");
var _branch = require("../models/branch.model");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config/config"));
var _validation = require("../middlewares/validation.middleware");
// src/sercreateUserices/user.service.js

// Import Bank model
// Import Branch model

//  configure your JWT secret and other settings

// Utility function for generating JWT
var generateToken = function generateToken(userId) {
  return _jsonwebtoken["default"].sign({
    id: userId
  }, _config["default"].jwtSecret, {
    // Use config.jwtSecret
    expiresIn: '1h' // Set an appropriate expiration time
  });
};

// Get all users
var getAllUsers = exports.getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var user, query, users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _user["default"].findById(id);
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 6;
            break;
          }
          throw new Error('User not found');
        case 6:
          query = {
            _id: {
              $ne: user._id
            } //Exclude the logged in user
          };
          _context.t0 = user.role;
          _context.next = _context.t0 === 'masterAdmin' ? 10 : _context.t0 === 'admin' ? 11 : _context.t0 === 'agent' ? 13 : _context.t0 === 'subAgent' ? 13 : _context.t0 === 'bankOperator' ? 15 : _context.t0 === 'user' ? 17 : 17;
          break;
        case 10:
          return _context.abrupt("break", 18);
        case 11:
          //Fetch all users except masterAdmin
          query = {
            createdBy: user._id,
            _id: {
              $ne: user._id
            }
          };
          return _context.abrupt("break", 18);
        case 13:
          // Fetch users created by this agent or sub-agent
          query = {
            createdBy: user._id,
            _id: {
              $ne: user._id
            }
          };
          return _context.abrupt("break", 18);
        case 15:
          // Fetch users associated with this bank and branch
          query = {
            bankId: user.bankId,
            branches: {
              $in: user.branches
            },
            _id: {
              $ne: user._id
            }
          };
          return _context.abrupt("break", 18);
        case 17:
          return _context.abrupt("return", []);
        case 18:
          _context.next = 20;
          return _user["default"].find(query).sort({
            createdAt: -1
          });
        case 20:
          users = _context.sent;
          return _context.abrupt("return", users);
        case 24:
          _context.prev = 24;
          _context.t1 = _context["catch"](0);
          throw new Error('Error fetching users: ' + _context.t1.message);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 24]]);
  }));
  return function getAllUsers(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Get user by ID
var getUserById = exports.getUserById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _user["default"].findById(id).populate('bankId', 'name').populate('branches', 'name location');
        case 3:
          user = _context2.sent;
          if (user) {
            _context2.next = 6;
            break;
          }
          throw new Error('User not found');
        case 6:
          return _context2.abrupt("return", user);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw new Error('Error fetching user: ' + _context2.t0.message);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getUserById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var findUserByMobileNumber = exports.findUserByMobileNumber = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(mobileNumber) {
    var user, otp, now, otpExpiry;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log(mobileNumber);
          _context3.prev = 1;
          if (mobileNumber) {
            _context3.next = 4;
            break;
          }
          throw new Error('Invalid mobileNumber');
        case 4:
          _context3.next = 6;
          return _user["default"].findOne({
            mobileNumber: mobileNumber
          });
        case 6:
          user = _context3.sent;
          // ✅ Use findOne instead of find
          console.log(user);
          if (user) {
            _context3.next = 10;
            break;
          }
          throw new Error('Invalid mobileNumber');
        case 10:
          otp = (0, _validation.generateOTP)();
          now = new Date();
          otpExpiry = new Date(now.getTime() + 5 * 60 * 1000); // OTP expires in 5 minutes
          user.otp = otp;
          user.otpExpiry = otpExpiry;
          _context3.next = 17;
          return user.save();
        case 17:
          return _context3.abrupt("return", {
            user: user,
            otp: otp
          });
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](1);
          console.error('Error finding user by mobileNumber:', _context3.t0);
          throw _context3.t0;
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 20]]);
  }));
  return function findUserByMobileNumber(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var sendOTP = exports.sendOTP = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(mobileNumber) {
    var _yield$findUserByMobi, otp, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return findUserByMobileNumber(mobileNumber);
        case 2:
          _yield$findUserByMobi = _context4.sent;
          otp = _yield$findUserByMobi.otp;
          user = _yield$findUserByMobi.user;
          if (user) {
            _context4.next = 7;
            break;
          }
          throw new Error('Invalid mobileNumber');
        case 7:
          //  TODO: Send OTP via mobileNumber/SMS.  Replace this with your actual sending mechanism.
          console.log("Sending OTP ".concat(otp, " to ").concat(mobileNumber)); // REMOVE THIS LINE IN PRODUCTION
          //  You would use a service like Twilio, SendGrid, etc.
          return _context4.abrupt("return", {
            otp: otp,
            mobileNumber: mobileNumber
          });
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function sendOTP(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var verifyOTP = exports.verifyOTP = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(mobileNumber, otp) {
    var user, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (mobileNumber) {
            _context5.next = 3;
            break;
          }
          throw new Error('Invalid Mobile Number');
        case 3:
          _context5.next = 5;
          return _user["default"].findOne({
            mobileNumber: mobileNumber
          });
        case 5:
          user = _context5.sent;
          if (user) {
            _context5.next = 8;
            break;
          }
          throw new Error('Invalid Mobile Number');
        case 8:
          if (user.otp) {
            _context5.next = 10;
            break;
          }
          throw new Error('OTP not sent.  Please request OTP.');
        case 10:
          if (!(user.otpExpiry < new Date())) {
            _context5.next = 12;
            break;
          }
          throw new Error('OTP expired');
        case 12:
          if (!(otp !== user.otp)) {
            _context5.next = 14;
            break;
          }
          throw new Error('Invalid OTP');
        case 14:
          token = generateToken(user._id); // Clear OTP after successful verification
          user.otp = undefined;
          user.otpExpiry = undefined;
          _context5.next = 19;
          return user.save();
        case 19:
          return _context5.abrupt("return", {
            user: user,
            token: token
          });
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](0);
          throw new Error('Error creating user: ' + _context5.t0.message);
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 22]]);
  }));
  return function verifyOTP(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

// Create a new user
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(userData) {
    var newUser, savedUser, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          newUser = new _user["default"](userData);
          _context6.next = 4;
          return newUser.save();
        case 4:
          savedUser = _context6.sent;
          token = generateToken(savedUser._id);
          return _context6.abrupt("return", {
            user: savedUser,
            token: token
          });
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          if (!(_context6.t0.code === 11000)) {
            _context6.next = 13;
            break;
          }
          throw new Error('Email or mobile number already exists');
        case 13:
          throw new Error('Error creating user: ' + _context6.t0.message);
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function createUser(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

// Update user by ID
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(id, updateData) {
    var updatedUser;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _user["default"].findByIdAndUpdate(id, updateData, {
            "new": true,
            runValidators: true
          }).populate('bankId', 'name').populate('branches', 'name location');
        case 3:
          updatedUser = _context7.sent;
          if (updatedUser) {
            _context7.next = 6;
            break;
          }
          throw new Error('User not found');
        case 6:
          return _context7.abrupt("return", updatedUser);
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          throw new Error('Error updating user: ' + _context7.t0.message);
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function updateUser(_x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

// Delete user by ID
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var deletedUser;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _user["default"].findByIdAndDelete(id);
        case 3:
          deletedUser = _context8.sent;
          if (deletedUser) {
            _context8.next = 6;
            break;
          }
          throw new Error('User not found');
        case 6:
          return _context8.abrupt("return", {
            message: 'User deleted successfully'
          });
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          throw new Error('Error deleting user: ' + _context8.t0.message);
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function deleteUser(_x0) {
    return _ref8.apply(this, arguments);
  };
}();