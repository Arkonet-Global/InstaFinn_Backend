"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceSchema = exports.PropertyInvestmentSchema = exports.PersonalInfoSchema = exports.LoanDetailsSchema = exports.FamilyInfoSchema = exports.EmploymentInfoSchema = exports.DocumentSchema = exports.BankDataSchema = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var PersonalInfoSchema = exports.PersonalInfoSchema = new _mongoose["default"].Schema({
  applicantName: {
    type: String,
    required: true
  },
  applicantDob: {
    type: Date,
    required: true
  },
  applicantGender: {
    type: String,
    "enum": ['Male', 'Female', 'Other'],
    required: true
  },
  applicantAddress: {
    type: String,
    required: true
  },
  applicantEmail: {
    type: String,
    required: true
  },
  applicantMobile: {
    type: String,
    required: true
  },
  applicantNationality: {
    type: String
  },
  applicantPin: {
    type: String
  },
  pan: {
    type: String
  }
}, {
  _id: false
});
var FamilyInfoSchema = exports.FamilyInfoSchema = new _mongoose["default"].Schema({
  maritalStatus: {
    type: String,
    "enum": ['Single', 'Married', 'Divorced', 'Separated', 'Widowed']
  },
  spouseName: {
    type: String
  },
  spouseDOB: {
    type: Date
  },
  spouseMobile: {
    type: String
  },
  spouseEmail: {
    type: String
  },
  childrenCount: {
    type: Number
  },
  fatherName: {
    type: String
  },
  fatherDOB: {
    type: Date
  },
  fatherMobile: {
    type: String
  },
  fatherEmail: {
    type: String
  },
  motherName: {
    type: String
  },
  motherDOB: {
    type: Date
  },
  motherMobile: {
    type: String
  },
  motherEmail: {
    type: String
  }
}, {
  _id: false
});
var EmploymentInfoSchema = exports.EmploymentInfoSchema = new _mongoose["default"].Schema({
  incomeSource: {
    type: String,
    required: true
  },
  annualIncome: {
    type: Number
  },
  employerOrBusinessName: {
    type: String
  },
  employerAddress: {
    type: String
  },
  workEmail: {
    type: String
  }
}, {
  _id: false
});
var LoanDetailsSchema = exports.LoanDetailsSchema = new _mongoose["default"].Schema({
  loanAmount: {
    type: Number,
    required: true
  },
  loanPurpose: {
    type: String
  },
  loanTerm: {
    type: Number
  },
  interestRate: {
    type: Number
  },
  emiAmount: {
    type: Number
  },
  loanType: {
    type: String
  }
}, {
  _id: false
});
var PropertyInvestmentSchema = exports.PropertyInvestmentSchema = new _mongoose["default"].Schema({
  propertyAddress: {
    type: String
  },
  propertyValue: {
    type: Number
  },
  investmentAmount: {
    type: Number
  },
  investmentType: {
    type: String
  }
}, {
  _id: false
});
var ReferenceSchema = exports.ReferenceSchema = new _mongoose["default"].Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  relationship: {
    type: String
  }
}, {
  _id: false
});
var DocumentSchema = exports.DocumentSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    "enum": ['photo', 'aadhar', 'pancard', 'itr', 'credit_report'],
    required: true
  }
}, {
  _id: false
});
var BankDataSchema = exports.BankDataSchema = new _mongoose["default"].Schema({
  bankId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Bank',
    required: true
  },
  branches: [{
    branchId: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'Branch',
      required: true
    },
    loanTypes: [{
      type: String,
      required: true // optional: enforce loanTypes must exist
    }]
  }]
}, {
  _id: false
});
var LoanApplicationSchema = new _mongoose["default"].Schema((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agentId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  // bankId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank',required:false }],
  // branchId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch',required:false }],

  personalInfo: PersonalInfoSchema,
  familyInfo: FamilyInfoSchema,
  employmentInfo: EmploymentInfoSchema,
  loanDetails: LoanDetailsSchema,
  propertyInvestment: PropertyInvestmentSchema,
  bankData: [BankDataSchema],
  creditScore: {
    type: Number
  },
  references: [ReferenceSchema],
  documents: [DocumentSchema],
  creditReport: [{
    type: Object
  }],
  collateral: {
    type: String
  },
  collateralDescription: {
    type: String
  },
  criteriaValues: [{
    criteriaId: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'LoanCriteria'
    },
    value: {
      type: _mongoose["default"].Schema.Types.Mixed,
      required: true
    }
  }]
}, "documents", [DocumentSchema]), "status", {
  type: String,
  "default": 'New'
}), "createdBy", {
  type: _mongoose["default"].Schema.Types.ObjectId,
  ref: 'User',
  required: true
}), "applicationDate", {
  type: Date,
  "default": Date.now
}), "createdAt", {
  type: Date,
  "default": Date.now
}), "updatedAt", {
  type: Date,
  "default": Date.now
}));
LoanApplicationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

//export default mongoose.model('LoanApplication', LoanApplicationSchema);
module.exports = _mongoose["default"].model('LoanApplication', LoanApplicationSchema);