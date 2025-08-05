"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var userSchema = new _mongoose["default"].Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    "enum": ['masterAdmin',
    //dev
    'admin',
    //mansing mobile
    'agent',
    //axios agent 
    'subAgent',
    //agent subagent 
    'user',
    //loan application 
    'bankOperator' //axios bank operator
    ],
    required: true
  },
  otp: {
    type: String,
    required: false // OTP is not always required
  },
  otpExpiry: {
    type: Date,
    required: false
  },
  applicationCount: {
    type: String,
    "default": 0
  },
  totalBusiness: {
    type: String,
    "default": 0
  },
  rank: {
    type: String,
    "default": 0
  },
  profileUrl: {
    type: String,
    required: false
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  bankId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Bank'
  },
  // For roles associated with a bank
  agentId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  // For subagent
  branches: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Branch'
  }] // For bankOperator
}, {
  timestamps: true // Add createdAt and updatedAt fields automatically
});

//ensure normalization before save if role is directly modified
userSchema.pre('validate', function (next) {
  if (this.role && typeof this.role === 'string') {
    var _require = require('../utils/normalizeRole'),
      normalizeRole = _require.normalizeRole;
    this.role = normalizeRole(this.role);
  }
  next();
});
var User = _mongoose["default"].model('User', userSchema);
var _default = exports["default"] = User;