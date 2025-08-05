"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var criteriaSchema = new _mongoose["default"].Schema({
  loanType: {
    type: String,
    required: true
  },
  criteria: {
    salary: {
      salary: {
        type: Boolean,
        "default": false
      },
      income: {
        type: Number,
        "default": 100000
      },
      creditScore: {
        type: Number,
        "default": 650
      },
      collateral: {
        type: String,
        "default": '0% to 10%'
      },
      // updated
      dti: {
        type: String,
        "default": '0% to 10%'
      } // updated
    },
    business: {
      business: {
        type: Boolean,
        "default": false
      },
      income: {
        type: Number,
        "default": 300000
      },
      creditScore: {
        type: Number,
        "default": 600
      },
      collateral: {
        type: String,
        "default": '0% to 10%'
      },
      // updated
      dti: {
        type: String,
        "default": '0% to 10%'
      } // updated
    }
  }
});
var loanCriteriaSchema = new _mongoose["default"].Schema({
  bankId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Bank',
    required: true
  },
  branchId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  loanCriteriaList: [criteriaSchema],
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  }
});
var LoanCriteria = _mongoose["default"].model('LoanCriteria', loanCriteriaSchema);
var _default = exports["default"] = LoanCriteria;