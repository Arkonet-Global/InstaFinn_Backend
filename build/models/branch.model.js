"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
// src/models/branch.model.js

var branchSchema = new _mongoose["default"].Schema({
  bankId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Bank',
    required: true
  },
  //bankName: { type: String, required: true },
  bankLocation: {
    type: String,
    required: true
  },
  ifscCode: {
    type: String,
    required: true
  },
  bankPin: {
    type: String,
    required: true
  },
  bankBranch: {
    type: String,
    required: true
  },
  bankPersonDesignation: {
    type: String,
    required: true
  },
  bankPersonEId: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  }
});
var Branch = _mongoose["default"].model('Branch', branchSchema);
var _default = exports["default"] = Branch;