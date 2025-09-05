"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMultipartLoanApplication = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var parseMultipartLoanApplication = exports.parseMultipartLoanApplication = function parseMultipartLoanApplication(req, res, next) {
  if (!req.is('multipart/form-data')) {
    return next();
  }
  var jsonFields = ['personalInfo', 'familyInfo', 'employmentInfo', 'loanDetails', 'propertyInvestment', 'bankData', 'references', 'criteriaValues', 'documents'];
  var fileFields = ['photo', 'aadharcard', 'pancard', 'incomeTaxReturn', 'creditReport'];

  // Parse expected JSON fields
  jsonFields.forEach(function (field) {
    if (req.body[field]) {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid JSON in field ".concat(field)
        });
      }
    }
  });

  // Clean up file fields from body
  fileFields.forEach(function (field) {
    if (field in req.body && (req.body[field] === '' || (0, _typeof2["default"])(req.body[field]) === 'object' && Object.keys(req.body[field]).length === 0)) {
      delete req.body[field];
    }
  });
  next();
};