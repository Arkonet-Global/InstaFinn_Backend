"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
// src/services/email.service.js
var transporter = require('../config/email.config');
var _require = require('../templates/emailTemplate'),
  Verification_Email_Template = _require.Verification_Email_Template;
var sendVerificationEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(toEmail, otp) {
    var htmlContent, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          htmlContent = Verification_Email_Template.replace('{verificationCode}', otp);
          mailOptions = {
            from: process.env.SMTP_USER,
            to: toEmail,
            subject: 'Your OTP Code - Arkonet Global',
            html: htmlContent
          };
          _context.prev = 2;
          _context.next = 5;
          return transporter.sendMail(mailOptions);
        case 5:
          console.log("\uD83D\uDCE9 OTP email sent to ".concat(toEmail));
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          console.error("\u274C Failed to send OTP email to ".concat(toEmail, ":"), _context.t0);
          throw new Error('Failed to send verification email');
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 8]]);
  }));
  return function sendVerificationEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  sendVerificationEmail: sendVerificationEmail
};