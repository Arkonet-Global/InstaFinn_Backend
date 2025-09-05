"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user.controller");
var _auth = require("../middlewares/auth.middleware");
var _validation = require("../middlewares/validation.middleware");
// src/routes/user.routes.js

// Import your auth middleware

var router = _express["default"].Router();

// Public routes
router.post('/', _validation.validateCreateUser, _user.createUser); // Apply validation middleware
//  Route for login
router.post('/login', _validation.validateLoginCredentials, _user.loginController);

//  Route for sending OTP
router.post('/otp/send', _user.sendOTPController);

//  Route for resending OTP
router.post('/otp/resend', _user.resendOTPController);

// Protected routes (require authentication)
router.get('/below/:id', _auth.authMiddleware, _user.getAllUsers);
router.get('/:id', _auth.authMiddleware, _user.getUserById);
router.put('/:id', _auth.authMiddleware, _user.updateUser);
router["delete"]('/:id', _auth.authMiddleware, _user.deleteUser);
var _default = exports["default"] = router;