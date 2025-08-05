"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasRole = exports.authMiddleware = exports.UserRole = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config/config"));
var _user = _interopRequireDefault(require("../models/user.model"));
//  for JWT secret
// Import the User model

// Interface for user role
var UserRole = exports.UserRole = {
  MasterAdmin: 'masterAdmin',
  Admin: 'admin',
  Agent: 'agent',
  SubAgent: 'subAgent',
  BankOperator: 'bankOperator',
  User: 'user'
};

// Authentication middleware
var authMiddleware = exports.authMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$headers$authoriz;
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Get the token from the header
          //const token = req.header('Authorization')?.replace('Bearer ', '');
          token = (_req$headers$authoriz = req.headers['authorization']) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1]; // Check if token exists
          if (token) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: 'Authorization token is required'
          }));
        case 3:
          _context.prev = 3;
          // Verify the token
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].jwtSecret); // Use config.jwtSecret
          // Fetch the user.  Important for authorization checks and to have user data.
          _context.next = 7;
          return _user["default"].findById(decoded.id);
        case 7:
          user = _context.sent;
          if (user) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token: User not found'
          }));
        case 10:
          // Store the user object in the request
          req.user = user;
          next();
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid token'
          }));
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 14]]);
  }));
  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Authorization middleware
var hasRole = exports.hasRole = function hasRole(roles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      // return res.status(403).json({ message: 'Unauthorized: req, res' });
      return res.status(403).json({
        message: "Access denied: User role '".concat(req.user.role, "' is not authorized")
      });
    }
    next();
  };
};

// export const hasPermission = (permissions) => {
//   return (req, res, next) => {
//     const userPermissions = req.user.permissions || [];
//     const hasRequiredPermission = permissions.every(permission => userPermissions.includes(permission));
//     if (!hasRequiredPermission) {
//       return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
//     }
//     next();
//   };
// };