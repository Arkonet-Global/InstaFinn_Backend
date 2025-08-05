"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BankDecision = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
// src/models/bank.model.js

var bankSchema = new _mongoose["default"].Schema({
  bankName: {
    type: String,
    required: [true, 'Bank name is required'],
    unique: true,
    // tells MongoDB to create a unique index
    trim: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true // auto-manage createdAt and updatedAt
});

// Optional: Add pre-save hook to update `updatedAt`
bankSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure the unique index is created
bankSchema.index({
  bankName: 1
}, {
  unique: true
});
var Bank = _mongoose["default"].model('Bank', bankSchema);
var bankDecisionSchema = new _mongoose["default"].Schema({
  loanId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'LoanApplication',
    required: true
  },
  bankOperatorId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAccepted: {
    type: Boolean,
    required: true
  },
  approvedAmount: {
    type: Number
  },
  interestRate: {
    type: Number
  },
  rejectionReason: {
    type: String
  },
  decisionAt: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
});
var BankDecision = exports.BankDecision = _mongoose["default"].model('BankDecision', bankDecisionSchema);
var _default = exports["default"] = Bank;