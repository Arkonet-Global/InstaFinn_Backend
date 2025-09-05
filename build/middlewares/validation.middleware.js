"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserBranch = exports.validateUpdateLoanCriteria = exports.validateUpdateLoanApplication = exports.validateLoginCredentials = exports.validateCreateUser = exports.validateCreateLoanCriteria = exports.validateCreateLoanApplicationDocuments = exports.validateCreateLoanApplication = exports.validateCreateBranch = exports.validateCreateBank = exports.transformLoanApplicationPayload = exports.generateOTP = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _crypto = _interopRequireDefault(require("crypto"));
var _normalizeRole = require("../utils/normalizeRole.js");
// src/middlewares/validation.middleware.js

// Validation schema for creating a new user

var createUserSchema = _joi["default"].object({
  fullName: _joi["default"].string().required(),
  address: _joi["default"].string().required(),
  pin: _joi["default"].string().required(),
  email: _joi["default"].string().email().required(),
  mobileNumber: _joi["default"].string().required(),
  role: _joi["default"].string().valid('masterAdmin', 'admin', 'agent', 'subAgent', 'bankOperator', 'user').required(),
  password: _joi["default"].string().min(6).optional(),
  applicationCount: _joi["default"].string()["default"](0),
  totalBusiness: _joi["default"].string()["default"](0),
  rank: _joi["default"].string()["default"](0),
  profileUrl: _joi["default"].string().optional(),
  createdBy: _joi["default"].string().custom(function (value, helpers) {
    if (value && !_mongoose["default"].Types.ObjectId.isValid(value)) {
      //check if the value exists before validating.
      return helpers.error('any.invalid');
    }
    return value;
  }).optional(),
  bankId: _joi["default"].string().custom(function (value, helpers) {
    if (value && !_mongoose["default"].Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).optional(),
  agentId: _joi["default"].string().custom(function (value, helpers) {
    if (value && !_mongoose["default"].Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).optional(),
  branches: _joi["default"].array().items(_joi["default"].string().custom(function (value, helpers) {
    if (value && !_mongoose["default"].Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  })).optional(),
  createdAt: _joi["default"].date().optional(),
  updatedAt: _joi["default"].date().optional()
}).required();

// // Middleware to validate the request body for creating a new user
// export const validateCreateUser = (req, res, next) => {
//   const { error } = createUserSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

var validateCreateUser = exports.validateCreateUser = function validateCreateUser(req, res, next) {
  // ✅ Normalize role before Joi schema validates it
  if (req.body.role) {
    req.body.role = (0, _normalizeRole.normalizeRole)(req.body.role);
  }
  var _createUserSchema$val = createUserSchema.validate(req.body),
    error = _createUserSchema$val.error;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

//Joi Validation Schema
var validateLoginSchema = _joi["default"].object({
  mobileNumber: _joi["default"].string().pattern(/^[0-9]{10}$/).required(),
  // Assuming mobile number is 10 digits
  otp: _joi["default"].string().min(6).max(6).required() // OTP is required for OTP login
}).required();

// const validateLoginSchema = Joi.object({
//   email : Joi.string().required(),
//   otp: Joi.string().min(6).max(6).required()
// }).required();

var validateLoginCredentials = exports.validateLoginCredentials = function validateLoginCredentials(req, res, next) {
  var _validateLoginSchema$ = validateLoginSchema.validate(req.body),
    error = _validateLoginSchema$.error;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

// Utility function to generate JWT token
var generateToken = function generateToken(userId) {
  return jwt.sign({
    userId: userId
  }, 'your-secret-key', {
    expiresIn: '1h'
  }); // Replace 'your-secret-key'
};

//  OTP Service Functions (otpService.js) - separate file
var generateOTP = exports.generateOTP = function generateOTP() {
  return _crypto["default"].randomBytes(3).toString('hex').toUpperCase(); // Generate a 6-character OTP
};

// Validation schema for creating a new bank
var validateCreateBank = exports.validateCreateBank = function validateCreateBank(req, res, next) {
  var createBankSchema = _joi["default"].object({
    bankName: _joi["default"].string().required()
  }).required();
  var _createBankSchema$val = createBankSchema.validate(req.body),
    error = _createBankSchema$val.error;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

// Validation schema for creating a new branch
var validateCreateBranch = exports.validateCreateBranch = function validateCreateBranch(req, res, next) {
  if (req.body.role) {
    req.body.role = (0, _normalizeRole.normalizeRole)(req.body.role);
  }
  var createBranchSchema = _joi["default"].object({
    bankId: _joi["default"].string().required(),
    //  You might want to validate as an ObjectId().
    name: _joi["default"].string().required(),
    location: _joi["default"].string().required(),
    ifscCode: _joi["default"].string().required(),
    contactPerson: _joi["default"].string()
  }).required();
  var _createBranchSchema$v = createBranchSchema.validate(req.body),
    error = _createBranchSchema$v.error;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

// {
// "fullName":"Loan Operator",
// "address":"At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
// "pin":"416208",
// "email":"bankoperator@gmail.com",
// "role":"bankOperator",
// "bankId":"68282ab965d33b277c094322",
// "bankBranch":"Shahupuri",
// "bankLocation":"1477, fhfuihsd, fhodih",
// "mobileNumber":"7485145785",
// "bankName":"Cosmos Bank",
// "bankPersonDesignation":"loan operator",
// "bankPersonEId":"C147",
// "createdBy":"6826dabd5646513020c275ab"
// }
var validateUserBranch = exports.validateUserBranch = function validateUserBranch(req, res, next) {
  var createUserBranchSchema = _joi["default"].object({
    fullName: _joi["default"].string().required(),
    address: _joi["default"].string().required(),
    pin: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    role: _joi["default"].string().required(),
    bankId: _joi["default"].string().required(),
    bankBranch: _joi["default"].string().required(),
    bankLocation: _joi["default"].string().required(),
    mobileNumber: _joi["default"].string().required(),
    bankName: _joi["default"].string().required(),
    bankPin: _joi["default"].string().required(),
    bankPersonDesignation: _joi["default"].string().required(),
    bankPersonEId: _joi["default"].string().required(),
    createdBy: _joi["default"].string().required(),
    ifscCode: _joi["default"].string().required()
  }).required();
  var _createUserBranchSche = createUserBranchSchema.validate(req.body),
    error = _createUserBranchSche.error;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

// Validation schema for creating a new loan application

var objectIdValidator = function objectIdValidator(value, helpers) {
  if (!_mongoose["default"].Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};
var validateCreateLoanApplication = exports.validateCreateLoanApplication = function validateCreateLoanApplication(req, res, next) {
  var schema = _joi["default"].object({
    userId: _joi["default"].string().required().custom(objectIdValidator),
    agentId: _joi["default"].string().optional().custom(objectIdValidator),
    createdBy: _joi["default"].string().required().custom(objectIdValidator),
    // Nested personal info
    personalInfo: _joi["default"].object({
      applicantName: _joi["default"].string().required(),
      applicantDob: _joi["default"].date().iso().required(),
      applicantGender: _joi["default"].string().valid('Male', 'Female', 'Other').required(),
      applicantAddress: _joi["default"].string().required(),
      applicantEmail: _joi["default"].string().email().required(),
      applicantMobile: _joi["default"].string().required(),
      applicantNationality: _joi["default"].string().optional().allow(null, ''),
      applicantPin: _joi["default"].string().optional().allow(null, ''),
      pan: _joi["default"].string().optional().allow(null, '')
    }).required(),
    // Nested family info
    familyInfo: _joi["default"].object({
      maritalStatus: _joi["default"].string().valid('Single', 'Married', 'Divorced', 'Separated', 'Widowed').optional(),
      spouseName: _joi["default"].string().optional().allow(null, ''),
      spouseDOB: _joi["default"].date().iso().optional().allow(null, ''),
      childrenCount: _joi["default"].number().optional().allow(null),
      fatherName: _joi["default"].string().optional().allow(null, ''),
      fatherDOB: _joi["default"].date().iso().optional().allow(null, ''),
      motherName: _joi["default"].string().optional().allow(null, ''),
      motherDOB: _joi["default"].date().iso().optional().allow(null, '')
    }).optional(),
    // Nested employment info
    employmentInfo: _joi["default"].object({
      incomeSource: _joi["default"].string().required(),
      annualIncome: _joi["default"].number().positive().optional(),
      employerOrBusinessName: _joi["default"].string().optional().allow(null, ''),
      employerAddress: _joi["default"].string().optional().allow(null, ''),
      workEmail: _joi["default"].string().email().optional().allow(null, '')
    }).required(),
    // Nested loan details
    loanDetails: _joi["default"].object({
      loanAmount: _joi["default"].number().positive().required(),
      loanPurpose: _joi["default"].string().optional().allow(null, ''),
      loanTerm: _joi["default"].number().positive().integer().optional(),
      interestRate: _joi["default"].number().positive().optional(),
      emiAmount: _joi["default"].number().positive().optional(),
      loanType: _joi["default"].string().optional()
    }).required(),
    // write joi schema for 
    // const BankDataSchema = new mongoose.Schema({
    //   bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: true },
    //   branches: [{
    //     branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    //     loanTypes: [{ type: String }]
    //   }]
    // }, { _id: false });

    // Nested bank data
    bankData: _joi["default"].object({
      bankId: _joi["default"].array().items(_joi["default"].object({
        branches: _joi["default"].array().items(_joi["default"].object({
          branchId: _joi["default"].string().required().custom(objectIdValidator),
          loanTypes: _joi["default"].array().items(_joi["default"].string()).min(1).required()
        })).min(1).required()
      })).min(1).required()
    }).optional(),
    // Nested property investment
    propertyInvestment: _joi["default"].object({
      propertyAddress: _joi["default"].string().optional().allow(null, ''),
      propertyValue: _joi["default"].number().positive().optional(),
      investmentAmount: _joi["default"].number().positive().optional(),
      investmentType: _joi["default"].string().optional().allow(null, '')
    }).optional(),
    // Other fields
    creditScore: _joi["default"].number().positive().integer().optional(),
    references: _joi["default"].array().items(_joi["default"].object({
      name: _joi["default"].string().required(),
      phone: _joi["default"].string().required(),
      relationship: _joi["default"].string().required()
    })).optional(),
    collateral: _joi["default"].string().optional().allow(null, ''),
    collateralDescription: _joi["default"].string().optional().allow(null, ''),
    criteriaValues: _joi["default"].array().items(_joi["default"].object({
      criteriaId: _joi["default"].string().required().custom(objectIdValidator),
      value: _joi["default"].alternatives()["try"](_joi["default"].string(), _joi["default"].number(), _joi["default"].date(), _joi["default"]["boolean"]()).required()
    })).optional(),
    documents: _joi["default"].array().items(_joi["default"].object({
      name: _joi["default"].string().required(),
      url: _joi["default"].string().uri().required(),
      type: _joi["default"].string().valid('photo', 'aadhar', 'pan', 'itr', 'credit_report').required()
    })).optional(),
    status: _joi["default"].string()["default"]('Pending').valid('Pending', 'Approved', 'Rejected', 'Processing'),
    applicationDate: _joi["default"].date()["default"](Date.now)
  });
  var _schema$validate = schema.validate(req.body, {
      abortEarly: false
    }),
    error = _schema$validate.error;
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      details: error.details.map(function (d) {
        return d.message;
      })
    });
  }
  next();
};
var transformLoanApplicationPayload = exports.transformLoanApplicationPayload = function transformLoanApplicationPayload(req, res, next) {
  var flatData = req.body;

  // Skip transformation if already nested
  if (flatData.personalInfo) {
    return next();
  }
  req.body = {
    userId: flatData.userId,
    agentId: flatData.agentId,
    createdBy: flatData.createdBy,
    personalInfo: {
      applicantName: flatData.applicantName,
      applicantDob: flatData.applicantDob,
      applicantGender: flatData.applicantGender,
      applicantAddress: flatData.applicantAddress,
      applicantEmail: flatData.applicantEmail,
      applicantMobile: flatData.applicantMobile,
      applicantNationality: flatData.applicantNationality,
      applicantPin: flatData.applicantPin,
      pan: flatData.pan
    },
    familyInfo: {
      maritalStatus: flatData.maritalStatus,
      spouseName: flatData.spouseName,
      spouseDOB: flatData.spouseDOB,
      childrenCount: flatData.childrenCount,
      fatherName: flatData.fatherName,
      fatherDOB: flatData.fatherDOB,
      motherName: flatData.motherName,
      motherDOB: flatData.motherDOB
    },
    employmentInfo: {
      incomeSource: flatData.incomeSource,
      annualIncome: flatData.annualIncome,
      employerOrBusinessName: flatData.employerOrBusinessName,
      employerAddress: flatData.employerAddress,
      workEmail: flatData.workEmail
    },
    loanDetails: {
      loanAmount: flatData.loanAmount,
      loanPurpose: flatData.loanPurpose,
      loanTerm: flatData.loanTerm,
      interestRate: flatData.interestRate,
      emiAmount: flatData.emiAmount,
      loanType: flatData.loanType
    },
    propertyInvestment: {
      propertyAddress: flatData.propertyAddress,
      propertyValue: flatData.propertyValue,
      investmentAmount: flatData.investmentAmount,
      investmentType: flatData.investmentType
    },
    creditScore: flatData.creditScore,
    references: flatData.references,
    collateral: flatData.collateral,
    collateralDescription: flatData.collateralDescription,
    criteriaValues: flatData.criteriaValues,
    documents: flatData.documents
  };
  next();
};

//loan application id, and documents
var validateCreateLoanApplicationDocuments = exports.validateCreateLoanApplicationDocuments = function validateCreateLoanApplicationDocuments(req, res, next) {
  var schema = _joi["default"].object({
    loanApplicationId: _joi["default"].string().required().custom(objectIdValidator),
    documents: _joi["default"].array().items(_joi["default"].object({
      name: _joi["default"].string().required(),
      url: _joi["default"].string().uri().required(),
      type: _joi["default"].string().optional().allow(null, '')
    })).required()
  });
  var _schema$validate2 = schema.validate(req.body, {
      abortEarly: false
    }),
    error = _schema$validate2.error;
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      details: error.details.map(function (d) {
        return d.message;
      })
    });
  }
};

// Validation schema for updating a loan application
var validateUpdateLoanApplication = exports.validateUpdateLoanApplication = function validateUpdateLoanApplication(req, res, next) {
  var updateLoanApplicationSchema = _joi["default"].object({
    status: _joi["default"].string().valid('pending', 'approved', 'rejected', 'resubmitted'),
    bankData: _joi["default"].object({
      bankId: _joi["default"].string().required().custom(objectIdValidator),
      branches: _joi["default"].array().items(_joi["default"].object({
        branchId: _joi["default"].string().required().custom(objectIdValidator),
        loanTypes: _joi["default"].array().items(_joi["default"].string()).min(1).required()
      })).min(1).required()
    }).optional(),
    interestRate: _joi["default"].number().positive(),
    approvedAmount: _joi["default"].number().positive(),
    rejectionReason: _joi["default"].string(),
    criteriaValues: _joi["default"].array().items(_joi["default"].object({
      criteriaId: _joi["default"].string().required(),
      value: _joi["default"].alternatives()["try"](_joi["default"].number(), _joi["default"].string(), _joi["default"].date(), _joi["default"]["boolean"]()).required()
    })),
    documents: _joi["default"].array().items(_joi["default"].object({
      name: _joi["default"].string().required(),
      url: _joi["default"].string().uri().required(),
      type: _joi["default"].string()
    }))
  }).min(1).required(); // At least one field must be present for update

  var _updateLoanApplicatio = updateLoanApplicationSchema.validate(req.body),
    error = _updateLoanApplicatio.error;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

// Validation schema for creating a new loan criteria
var validateCreateLoanCriteria = exports.validateCreateLoanCriteria = function validateCreateLoanCriteria(req, res, next) {
  var objectId = function objectId(value, helpers) {
    if (!_mongoose["default"].Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  };
  var salarySchema = _joi["default"].object({
    salary: _joi["default"]["boolean"]()["default"](false),
    income: _joi["default"].number().empty('').allow(null)["default"](100000),
    creditScore: _joi["default"].number().empty('').allow(null)["default"](650),
    collateral: _joi["default"].string().empty('').allow(null)["default"]('0% to 10%'),
    dti: _joi["default"].string().empty('').allow(null)["default"]('0% to 10%')
  })["default"]();
  var businessSchema = _joi["default"].object({
    business: _joi["default"]["boolean"]()["default"](false),
    income: _joi["default"].number().empty('').allow(null)["default"](300000),
    creditScore: _joi["default"].number().empty('').allow(null)["default"](600),
    collateral: _joi["default"].string().empty('').allow(null)["default"]('0% to 10%'),
    dti: _joi["default"].string().empty('').allow(null)["default"]('0% to 10%')
  })["default"]();
  var criteriaSchema = _joi["default"].object({
    loanType: _joi["default"].string().required(),
    criteria: _joi["default"].object({
      salary: salarySchema,
      business: businessSchema
    }).required()
  });
  var createLoanCriteriaSchema = _joi["default"].object({
    bankId: _joi["default"].string().custom(objectId).required(),
    branchId: _joi["default"].string().custom(objectId).required(),
    loanCriteriaList: _joi["default"].array().items(criteriaSchema).min(1).required()
  });
  var _createLoanCriteriaSc = createLoanCriteriaSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    }),
    error = _createLoanCriteriaSc.error,
    value = _createLoanCriteriaSc.value;
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      details: error.details.map(function (d) {
        return d.message;
      })
    });
  }

  // update request with cleaned values
  req.body = value;
  next();
};

// Validation schema for updating loan criteria
var validateUpdateLoanCriteria = exports.validateUpdateLoanCriteria = function validateUpdateLoanCriteria(req, res, next) {
  var updateLoanCriteriaSchema = _joi["default"].object({
    bankId: _joi["default"].string(),
    branchId: _joi["default"].string(),
    criteriaName: _joi["default"].string(),
    criteriaDescription: _joi["default"].string(),
    minValue: _joi["default"].number().when('dataType', {
      // Added dataType check
      is: 'number',
      then: _joi["default"].number().optional(),
      otherwise: _joi["default"].forbidden()
    }),
    maxValue: _joi["default"].number().when('dataType', {
      // Added dataType check
      is: 'number',
      then: _joi["default"].number().optional(),
      otherwise: _joi["default"].forbidden()
    }),
    dataType: _joi["default"].string().valid('number', 'string', 'date', 'boolean'),
    required: _joi["default"]["boolean"]()
  }).min(1).required();
  var _updateLoanCriteriaSc = updateLoanCriteriaSchema.validate(req.body),
    error = _updateLoanCriteriaSc.error;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};