"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    fullName: _joi["default"].string().required(),
    address: _joi["default"].string().required(),
    pin: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    mobileNumber: _joi["default"].string().required(),
    role: _joi["default"].string().valid('masterAdmin', 'admin', 'agent', 'subUser', 'bank', 'applicant').required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};