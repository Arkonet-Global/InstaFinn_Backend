"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteLoanApplication = exports.createLoanApplicationDocumentService = exports.createLoanApplication = void 0;
exports.fetchAdminLoanApplications = fetchAdminLoanApplications;
exports.fetchAgentLoanApplications = fetchAgentLoanApplications;
exports.fetchBankOperatorFromLoanApplication = fetchBankOperatorFromLoanApplication;
exports.uploadLoanApplicationFiles = exports.uploadDocuments = exports.updateLoanApplicationWithFilesService = exports.updateLoanApplicationStatus = exports.updateLoanApplicationBranchService = exports.processLoanDecision = exports.getLoanApplicationsByUserId = exports.getLoanApplicationsByAgentId = exports.getLoanApplicationById = exports.getAllLoanApplicationsService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _loanApplication = _interopRequireDefault(require("../models/loanApplication.model"));
var _loanCriteria = _interopRequireDefault(require("../models/loanCriteria.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _branch = _interopRequireDefault(require("../models/branch.model"));
var _express = require("express");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bank = require("../models/bank.model");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } // Assuming multer is set up
// src/services/loanApplication.service.js
// Import LoanCriteria
// Import User\
//import BankDecision from '../models/loanApplication.model';
var createLoanApplication = exports.createLoanApplication = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(applicationData, id) {
    var _application, newApplication;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log(applicationData, id);
          _context.prev = 1;
          _context.next = 4;
          return _loanApplication["default"].create(applicationData);
        case 4:
          _application = _context.sent;
          console.log(_application);
          newApplication = {};
          newApplication["status"] = _application === null || _application === void 0 ? void 0 : _application.status;
          newApplication["_id"] = _application === null || _application === void 0 ? void 0 : _application._id;
          newApplication["userId"] = _application === null || _application === void 0 ? void 0 : _application.userId;
          newApplication["personalInfo"] = _application === null || _application === void 0 ? void 0 : _application.personalInfo;
          newApplication["familyInfo"] = _application === null || _application === void 0 ? void 0 : _application.familyInfo;
          newApplication["employmentInfo"] = _application === null || _application === void 0 ? void 0 : _application.employmentInfo;
          newApplication["loanDetails"] = _application === null || _application === void 0 ? void 0 : _application.loanDetails;
          newApplication["creditScore"] = _application === null || _application === void 0 ? void 0 : _application.creditScore;
          newApplication["agentId"] = id;
          return _context.abrupt("return", newApplication);
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", _context.t0.message);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 19]]);
  }));
  return function createLoanApplication(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createLoanApplicationDocumentService = exports.createLoanApplicationDocumentService = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(applicationData, userId) {
    var _application2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _loanApplication["default"].findByIdAndUpdate(applicationData.applicationId, {
            $push: {
              documents: {
                $each: applicationData.documents
              }
            }
          }, {
            "new": true
          });
        case 3:
          _application2 = _context2.sent;
          return _context2.abrupt("return", _application2);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0.message);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function createLoanApplicationDocumentService(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var uploadDocuments = exports.uploadDocuments = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var applicationId, uploadedDocs, key, fileArray, _iterator, _step, file, result, updatedApp;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          applicationId = req.params.applicationId;
          if (!(!req.files || Object.keys(req.files).length === 0)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'No files were uploaded.'
          }));
        case 4:
          uploadedDocs = [];
          _context3.t0 = _regenerator["default"].keys(req.files);
        case 6:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 30;
            break;
          }
          key = _context3.t1.value;
          fileArray = Array.isArray(req.files[key]) ? req.files[key] : [req.files[key]];
          _iterator = _createForOfIteratorHelper(fileArray);
          _context3.prev = 10;
          _iterator.s();
        case 12:
          if ((_step = _iterator.n()).done) {
            _context3.next = 20;
            break;
          }
          file = _step.value;
          _context3.next = 16;
          return _cloudinary["default"].uploader.upload(file.tempFilePath, {
            folder: "loan_documents/".concat(applicationId)
          });
        case 16:
          result = _context3.sent;
          uploadedDocs.push({
            name: key,
            url: result.secure_url,
            type: result.resource_type
          });
        case 18:
          _context3.next = 12;
          break;
        case 20:
          _context3.next = 25;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t2 = _context3["catch"](10);
          _iterator.e(_context3.t2);
        case 25:
          _context3.prev = 25;
          _iterator.f();
          return _context3.finish(25);
        case 28:
          _context3.next = 6;
          break;
        case 30:
          _context3.next = 32;
          return _loanApplication["default"].findByIdAndUpdate(applicationId, {
            $push: {
              documents: {
                $each: uploadedDocs
              }
            }
          }, {
            "new": true
          });
        case 32:
          updatedApp = _context3.sent;
          res.status(200).json({
            message: 'Documents uploaded',
            updatedApp: updatedApp
          });
          _context3.next = 39;
          break;
        case 36:
          _context3.prev = 36;
          _context3.t3 = _context3["catch"](0);
          res.status(500).json({
            error: _context3.t3.message
          });
        case 39:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 36], [10, 22, 25, 28]]);
  }));
  return function uploadDocuments(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var uploadLoanApplicationFiles = exports.uploadLoanApplicationFiles = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var applicationId, uploadedFiles, _i, _arr, _req$files, field, files, _iterator2, _step2, file, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          applicationId = req.params.applicationId;
          uploadedFiles = [];
          _i = 0, _arr = ['photo', 'aadharcard', 'pancard', 'incomeTaxReturn', 'creditReport'];
        case 4:
          if (!(_i < _arr.length)) {
            _context4.next = 30;
            break;
          }
          field = _arr[_i];
          if (!((_req$files = req.files) !== null && _req$files !== void 0 && _req$files[field])) {
            _context4.next = 27;
            break;
          }
          files = Array.isArray(req.files[field]) ? req.files[field] : [req.files[field]];
          _iterator2 = _createForOfIteratorHelper(files);
          _context4.prev = 9;
          _iterator2.s();
        case 11:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 19;
            break;
          }
          file = _step2.value;
          _context4.next = 15;
          return _cloudinary["default"].uploader.upload(file.path, {
            folder: "loan_applications/".concat(applicationId, "/").concat(field)
          });
        case 15:
          result = _context4.sent;
          uploadedFiles.push({
            name: field,
            url: result.secure_url,
            type: file.mimetype
          });
        case 17:
          _context4.next = 11;
          break;
        case 19:
          _context4.next = 24;
          break;
        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](9);
          _iterator2.e(_context4.t0);
        case 24:
          _context4.prev = 24;
          _iterator2.f();
          return _context4.finish(24);
        case 27:
          _i++;
          _context4.next = 4;
          break;
        case 30:
          _context4.next = 32;
          return _loanApplication["default"].findByIdAndUpdate(applicationId, {
            $push: {
              documents: {
                $each: uploadedFiles
              }
            }
          });
        case 32:
          res.status(200).json({
            message: 'Files uploaded',
            uploaded: uploadedFiles
          });
          _context4.next = 39;
          break;
        case 35:
          _context4.prev = 35;
          _context4.t1 = _context4["catch"](0);
          console.error(_context4.t1);
          res.status(500).json({
            message: 'Upload failed'
          });
        case 39:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 35], [9, 21, 24, 27]]);
  }));
  return function uploadLoanApplicationFiles(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllLoanApplicationsService = exports.getAllLoanApplicationsService = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(role, userId) {
    var query, _user$branches, user, applications;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          query = {};
          if (!(role === 'subAgent')) {
            _context5.next = 6;
            break;
          }
          query.createdBy = userId;
          _context5.next = 23;
          break;
        case 6:
          if (!(role === 'agent')) {
            _context5.next = 10;
            break;
          }
          query.agentId = userId;
          _context5.next = 23;
          break;
        case 10:
          if (!(role === 'admin')) {
            _context5.next = 14;
            break;
          }
          query.adminIds = userId;
          _context5.next = 23;
          break;
        case 14:
          if (!(role === 'bankOperator')) {
            _context5.next = 23;
            break;
          }
          _context5.next = 17;
          return _user["default"].findById(userId);
        case 17:
          user = _context5.sent;
          if (!(user && ((_user$branches = user.branches) === null || _user$branches === void 0 ? void 0 : _user$branches.length) > 0)) {
            _context5.next = 22;
            break;
          }
          query['bankData.branches.branchId'] = {
            $in: user.branches
          };
          _context5.next = 23;
          break;
        case 22:
          return _context5.abrupt("return", []);
        case 23:
          _context5.next = 25;
          return _loanApplication["default"].find(query).populate('userId', 'fullName email').populate('agentId', 'fullName').populate('bankData.bankId', 'bankName').populate('bankData.branches.branchId', 'branchName bankLocation');
        case 25:
          applications = _context5.sent;
          return _context5.abrupt("return", applications);
        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](0);
          throw new Error('Error fetching visible applications: ' + _context5.t0.message);
        case 32:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 29]]);
  }));
  return function getAllLoanApplicationsService(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// Get loan application by ID
var getLoanApplicationById = exports.getLoanApplicationById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var _application3;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _loanApplication["default"].findById(id);
        case 3:
          _application3 = _context6.sent;
          if (_application3) {
            _context6.next = 6;
            break;
          }
          throw new Error('Loan application not found');
        case 6:
          return _context6.abrupt("return", _application3);
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          throw new Error('Error fetching loan application: ' + _context6.t0.message);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function getLoanApplicationById(_x1) {
    return _ref6.apply(this, arguments);
  };
}();

// Update loan application
var updateLoanApplicationWithFilesService = exports.updateLoanApplicationWithFilesService = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(id, updateData, role, userId) {
    var _application4, allowedLoanTypes, updatedApplication, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _loanApplication["default"].findById(id);
        case 3:
          _application4 = _context7.sent;
          if (_application4) {
            _context7.next = 6;
            break;
          }
          throw new Error('Loan application not found');
        case 6:
          if (!(role === 'user' && _application4.userId.toString() !== userId)) {
            _context7.next = 8;
            break;
          }
          throw new Error('Unauthorized: You can only update your own loan applications.');
        case 8:
          if (!((role === 'agent' || role === 'subAgent') && _application4.agentId && _application4.agentId.toString() !== userId)) {
            _context7.next = 10;
            break;
          }
          throw new Error("Unauthorized: You can only update loan applications that you submitted");
        case 10:
          if (!(_application4.status === 'approved')) {
            _context7.next = 12;
            break;
          }
          throw new Error('Cannot update an approved loan application.');
        case 12:
          if (!(_application4.status === 'rejected' && updateData.status !== 'resubmitted')) {
            _context7.next = 14;
            break;
          }
          throw new Error('Only status "resubmitted" is allowed after rejection');
        case 14:
          // Optional: Parse and sanitize bankData if present
          allowedLoanTypes = new Set();
          if (!updateData.data) {
            _context7.next = 19;
            break;
          }
          updateData.bankData = updateData.data.map(function (bank) {
            return {
              bankId: new _mongoose["default"].Types.ObjectId(bank.bankId),
              branches: bank.branches.map(function (branch) {
                var loanTypesArray = Array.isArray(branch.loanTypes) ? branch.loanTypes : [branch.loanTypes];
                loanTypesArray.forEach(function (type) {
                  return allowedLoanTypes.add(type);
                });
                return {
                  branchId: new _mongoose["default"].Types.ObjectId(branch.branchId),
                  loanTypes: loanTypesArray
                };
              })
            };
          });
          if (!(allowedLoanTypes.size > 1)) {
            _context7.next = 19;
            break;
          }
          throw new Error('Only one loan type is allowed across all banks/branches.');
        case 19:
          _context7.next = 21;
          return _loanApplication["default"].findByIdAndUpdate(id, updateData, {
            "new": true,
            runValidators: true
          }).populate('userId', 'id name').populate('agentId', 'id name').populate('bankData.bankId', 'name').populate('bankData.branches.branchId', 'name location').populate('criteriaValues.criteriaId', 'criteriaName');
        case 21:
          updatedApplication = _context7.sent;
          result = null;
          if (!(updatedApplication.bankData && updatedApplication.bankData.length > 0)) {
            _context7.next = 30;
            break;
          }
          _context7.next = 26;
          return fetchBankOperatorFromLoanApplication(updatedApplication);
        case 26:
          result = _context7.sent;
          console.log(result.operators);
          _context7.next = 31;
          break;
        case 30:
          console.warn('⚠️ Skipping bank operator fetch: No bankData present');
        case 31:
          _context7.next = 36;
          break;
        case 33:
          _context7.prev = 33;
          _context7.t0 = _context7["catch"](0);
          throw new Error('Error updating loan application: ' + _context7.t0.message);
        case 36:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 33]]);
  }));
  return function updateLoanApplicationWithFilesService(_x10, _x11, _x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

// Get visible loan applications based on user role
// export const updateLoanApplicationService = async (id, updateData, role, userId) => {
//   try {
//     const existing = await LoanApplication.findById(id);
//     if (!existing) throw new Error("Loan application not found");

//     if ((role === 'agent' || role === 'subAgent') && existing.createdBy.toString() !== userId)
//       throw new Error("Unauthorized: You can only update applications you submitted");

//     const updated = await LoanApplication.findByIdAndUpdate(
//       id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     return updated;
//   } catch (error) {
//     throw new Error("Error updating loan application: " + error.message);
//   }
// };

var updateLoanApplicationBranchService = exports.updateLoanApplicationBranchService = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(id, updateData, role, userId) {
    var _updatedApp$bankData, _application5, _application5$created, creatorId, currentUserId, subAgents, subAgentIds, _creatorId, userIdStr, allowedLoanTypes, bankData, updatedApp;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _loanApplication["default"].findById(id);
        case 3:
          _application5 = _context8.sent;
          if (_application5) {
            _context8.next = 6;
            break;
          }
          throw new Error("Loan application not found");
        case 6:
          // 🛡️ Debug logs
          console.log("🔐 Role:", role);
          console.log("🔐 Requesting User ID:", userId);
          console.log("🔐 Application CreatedBy:", _application5.createdBy.toString());
          if (!(role === 'subAgent')) {
            _context8.next = 16;
            break;
          }
          creatorId = (_application5$created = _application5.createdBy) === null || _application5$created === void 0 ? void 0 : _application5$created.toString();
          currentUserId = userId === null || userId === void 0 ? void 0 : userId.toString();
          console.log("📌 creatorId:", creatorId);
          console.log("📌 currentUserId:", currentUserId);
          if (!(creatorId !== currentUserId)) {
            _context8.next = 16;
            break;
          }
          throw new Error("Unauthorized: Only the sub-agent creator can update this application");
        case 16:
          if (!(role === 'agent')) {
            _context8.next = 28;
            break;
          }
          _context8.next = 19;
          return _user["default"].find({
            createdBy: userId,
            role: 'subAgent'
          }).select('_id');
        case 19:
          subAgents = _context8.sent;
          subAgentIds = subAgents.map(function (sa) {
            return sa._id.toString();
          });
          _creatorId = _application5.createdBy.toString();
          userIdStr = userId.toString();
          console.log("🧾 SubAgent IDs of Agent:", subAgentIds);
          console.log("📌 creatorId:", _creatorId);
          console.log("📌 userIdStr:", userIdStr);
          if (!(_creatorId !== userIdStr && !subAgentIds.includes(_creatorId))) {
            _context8.next = 28;
            break;
          }
          throw new Error("Unauthorized: You don't have access to this application");
        case 28:
          if (!(_application5.status === 'approved')) {
            _context8.next = 30;
            break;
          }
          throw new Error("Cannot update bank data on an approved application");
        case 30:
          if (!(_application5.status === 'rejected' && updateData.status !== 'resubmitted')) {
            _context8.next = 32;
            break;
          }
          throw new Error("Only status 'resubmitted' is allowed after rejection");
        case 32:
          if (Array.isArray(updateData.bankData)) {
            _context8.next = 34;
            break;
          }
          throw new Error("Invalid bank data format");
        case 34:
          // ✅ Prepare and validate loan types
          allowedLoanTypes = new Set();
          bankData = updateData.bankData.map(function (bank) {
            return {
              bankId: new _mongoose["default"].Types.ObjectId(bank.bankId),
              branches: bank.branches.map(function (branch) {
                var loanTypesArray = Array.isArray(branch.loanTypes) ? branch.loanTypes : [branch.loanTypes];
                loanTypesArray.forEach(function (type) {
                  return allowedLoanTypes.add(type);
                });
                return {
                  branchId: new _mongoose["default"].Types.ObjectId(branch.branchId),
                  loanTypes: loanTypesArray
                };
              })
            };
          });
          if (!(allowedLoanTypes.size > 1)) {
            _context8.next = 38;
            break;
          }
          throw new Error("Only one loan type allowed across all branches");
        case 38:
          _context8.next = 40;
          return _loanApplication["default"].findByIdAndUpdate(id, {
            status: 'pending',
            bankData: bankData
          }, {
            "new": true,
            runValidators: true
          });
        case 40:
          updatedApp = _context8.sent;
          console.log(updatedApp);
          if (!((updatedApp === null || updatedApp === void 0 || (_updatedApp$bankData = updatedApp.bankData) === null || _updatedApp$bankData === void 0 ? void 0 : _updatedApp$bankData.length) > 0)) {
            _context8.next = 45;
            break;
          }
          _context8.next = 45;
          return fetchBankOperatorFromLoanApplication(updatedApp);
        case 45:
          return _context8.abrupt("return", updatedApp);
        case 48:
          _context8.prev = 48;
          _context8.t0 = _context8["catch"](0);
          throw new Error("Error updating bank selection: " + _context8.t0.message);
        case 51:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 48]]);
  }));
  return function updateLoanApplicationBranchService(_x14, _x15, _x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();
var deleteLoanApplication = exports.deleteLoanApplication = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(id, role, userId) {
    var _application6, deletedApplication;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _loanApplication["default"].findById(id);
        case 3:
          _application6 = _context9.sent;
          if (_application6) {
            _context9.next = 6;
            break;
          }
          throw new Error('Loan application not found');
        case 6:
          if (!(role === 'user' && _application6.userId.toString() !== userId)) {
            _context9.next = 8;
            break;
          }
          throw new Error('Unauthorized: You can only delete your own loan applications.');
        case 8:
          if (!(role === 'agent' || role === 'subAgent')) {
            _context9.next = 11;
            break;
          }
          if (!(_application6.agentId && _application6.agentId.toString() !== userId)) {
            _context9.next = 11;
            break;
          }
          throw new Error("Unauthorized: You can only delete loan applications that you submitted");
        case 11:
          if (!(_application6.status !== 'pending' && _application6.status !== 'resubmitted')) {
            _context9.next = 13;
            break;
          }
          throw new Error('Cannot delete loan application with status: ' + _application6.status);
        case 13:
          _context9.next = 15;
          return _loanApplication["default"].findByIdAndDelete(id);
        case 15:
          deletedApplication = _context9.sent;
          if (deletedApplication) {
            _context9.next = 18;
            break;
          }
          throw new Error('Loan application not found');
        case 18:
          return _context9.abrupt("return", {
            message: 'Loan application deleted successfully'
          });
        case 21:
          _context9.prev = 21;
          _context9.t0 = _context9["catch"](0);
          throw new Error('Error deleting loan application: ' + _context9.t0.message);
        case 24:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 21]]);
  }));
  return function deleteLoanApplication(_x18, _x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}();

// Get loan applications by User ID
var getLoanApplicationsByUserId = exports.getLoanApplicationsByUserId = /*#__PURE__*/function () {
  var _ref0 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee0(userId) {
    var applications;
    return _regenerator["default"].wrap(function _callee0$(_context0) {
      while (1) switch (_context0.prev = _context0.next) {
        case 0:
          _context0.prev = 0;
          _context0.next = 3;
          return _loanApplication["default"].find({
            userId: userId
          }).populate('userId', 'id').populate('agentId', 'id').populate('bankId', 'name').populate('branchId', 'name location').populate('criteriaValues.criteriaId', 'criteriaName');
        case 3:
          applications = _context0.sent;
          return _context0.abrupt("return", applications);
        case 7:
          _context0.prev = 7;
          _context0.t0 = _context0["catch"](0);
          throw new Error('Error fetching loan applications: ' + _context0.t0.message);
        case 10:
        case "end":
          return _context0.stop();
      }
    }, _callee0, null, [[0, 7]]);
  }));
  return function getLoanApplicationsByUserId(_x21) {
    return _ref0.apply(this, arguments);
  };
}();

// Get loan applications by Agent ID
var getLoanApplicationsByAgentId = exports.getLoanApplicationsByAgentId = /*#__PURE__*/function () {
  var _ref1 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee1(agentRole, agentId) {
    var allSubAgents, subAgentIds, applications, loanApplication;
    return _regenerator["default"].wrap(function _callee1$(_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          _context1.prev = 0;
          if ((agentRole === null || agentRole === void 0 ? void 0 : agentRole.toLowerCase()) == "subagent") {
            fetchSubAgentLoanApplication(agentId, agentRole);
          }
          fetchAgentLoanApplications(agentId);
          fetchAdminLoanApplications(agentId);
          _context1.next = 6;
          return _user["default"].find({
            createdBy: agentId
          });
        case 6:
          allSubAgents = _context1.sent;
          console.log(allSubAgents);
          subAgentIds = [];
          if (allSubAgents.length > 0) {
            allSubAgents === null || allSubAgents === void 0 || allSubAgents.forEach(function (subAgent) {
              subAgentIds.push(subAgent._id);
            });
          }
          subAgentIds.push(agentId);
          console.log(subAgentIds);
          _context1.next = 14;
          return _loanApplication["default"].find({
            agentId: {
              $in: subAgentIds
            }
          }).populate('userId', 'id').populate('agentId', 'id').populate('bankId', 'name').populate('branchId', 'name location').populate('criteriaValues.criteriaId', 'criteriaName');
        case 14:
          applications = _context1.sent;
          _context1.next = 17;
          return _loanApplication["default"].find();
        case 17:
          loanApplication = _context1.sent;
          return _context1.abrupt("return", {
            applications: applications,
            loanApplication: loanApplication
          });
        case 21:
          _context1.prev = 21;
          _context1.t0 = _context1["catch"](0);
          console.log(agentId);
          throw new Error('Error fetching loan applications: ' + _context1.t0.message);
        case 25:
        case "end":
          return _context1.stop();
      }
    }, _callee1, null, [[0, 21]]);
  }));
  return function getLoanApplicationsByAgentId(_x22, _x23) {
    return _ref1.apply(this, arguments);
  };
}();
function fetchSubAgentLoanApplication(_x24) {
  return _fetchSubAgentLoanApplication.apply(this, arguments);
}
function _fetchSubAgentLoanApplication() {
  _fetchSubAgentLoanApplication = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(id) {
    var subAgent, applications;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          console.log("SubAgent fetch start");
          _context12.prev = 1;
          _context12.next = 4;
          return _user["default"].findById(id);
        case 4:
          subAgent = _context12.sent;
          if (subAgent) {
            _context12.next = 7;
            break;
          }
          throw new Error('SubAgent not found');
        case 7:
          console.log("SubAgent:", subAgent);

          // 2. Fetch loan applications created by this sub-agent
          _context12.next = 10;
          return _loanApplication["default"].find({
            createdBy: id
          }).populate('userId', 'id name').populate('createdBy', 'id name') // Show who created it
          .populate('agentId', 'id name') // Who submitted it
          .populate('bankId', 'name').populate('branchId', 'name location').populate('criteriaValues.criteriaId', 'criteriaName');
        case 10:
          applications = _context12.sent;
          console.log("Applications by sub-agent:", applications);
          console.log("SubAgent fetch end");
          return _context12.abrupt("return", {
            subAgent: subAgent,
            applications: applications
          });
        case 16:
          _context12.prev = 16;
          _context12.t0 = _context12["catch"](1);
          console.error("Error in fetchSubAgentLoanApplication:", _context12.t0.message);
          throw new Error('Failed to fetch sub-agent loan applications: ' + _context12.t0.message);
        case 20:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 16]]);
  }));
  return _fetchSubAgentLoanApplication.apply(this, arguments);
}
function fetchAgentLoanApplications(_x25) {
  return _fetchAgentLoanApplications.apply(this, arguments);
}
function _fetchAgentLoanApplications() {
  _fetchAgentLoanApplications = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee13(id) {
    var agent, subAgents, agentIds, applications;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          console.log("agent start");

          // 1. Find the agent
          _context13.next = 3;
          return _user["default"].findById(id);
        case 3:
          agent = _context13.sent;
          if (agent) {
            _context13.next = 6;
            break;
          }
          throw new Error('Agent not found');
        case 6:
          console.log("Agent:", agent);

          // 2. Find subagents created by this agent
          _context13.next = 9;
          return _user["default"].find({
            createdBy: id
          });
        case 9:
          subAgents = _context13.sent;
          console.log("SubAgents:", subAgents);

          // 3. Collect all agent/subagent IDs for matching
          agentIds = [id].concat((0, _toConsumableArray2["default"])(subAgents.map(function (sa) {
            return sa._id;
          }))).map(function (_id) {
            return new _mongoose["default"].Types.ObjectId(_id);
          });
          console.log("Agent & SubAgent IDs:", agentIds);

          // 4. Fetch loan applications where createdBy is in agentIds
          _context13.next = 15;
          return _loanApplication["default"].find({
            createdBy: {
              $in: agentIds
            }
          }).populate('userId', 'id name').populate('createdBy', 'id name') // optional: if you want to show which agent submitted it
          .populate('bankId', 'name').populate('branchId', 'name location').populate('criteriaValues.criteriaId', 'criteriaName');
        case 15:
          applications = _context13.sent;
          console.log("Applications:", applications);
          console.log("agent end");
          return _context13.abrupt("return", {
            agent: agent,
            subAgents: subAgents,
            applications: applications
          });
        case 19:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return _fetchAgentLoanApplications.apply(this, arguments);
}
function fetchAdminLoanApplications(_x26) {
  return _fetchAdminLoanApplications.apply(this, arguments);
}
function _fetchAdminLoanApplications() {
  _fetchAdminLoanApplications = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee14(id) {
    var admin, agents, subAgents, allIds, adminIds, applications;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          console.log("admin start");

          // 1. Find the admin
          _context14.next = 3;
          return _user["default"].findById(id);
        case 3:
          admin = _context14.sent;
          if (admin) {
            _context14.next = 6;
            break;
          }
          throw new Error('Admin not found');
        case 6:
          console.log("Admin:", admin);

          // 2. Find agents created by this admin
          _context14.next = 9;
          return _user["default"].find({
            createdBy: id
          });
        case 9:
          agents = _context14.sent;
          console.log("Agents:", agents);

          // 3. Find subagents created by this admin
          _context14.next = 13;
          return _user["default"].find({
            createdBy: id
          });
        case 13:
          subAgents = _context14.sent;
          console.log("SubAgents:", subAgents);

          // 4. Collect all agent/subagent IDs for matching
          allIds = [id].concat((0, _toConsumableArray2["default"])(agents.map(function (a) {
            return a._id;
          })), (0, _toConsumableArray2["default"])(subAgents.map(function (sa) {
            return sa._id;
          }))); // Ensure all IDs are `ObjectId` type and unique
          adminIds = Array.from(new Set(allIds.map(function (_id) {
            return _id.toString();
          })) // convert to string for uniqueness
          ).map(function (strId) {
            return new _mongoose["default"].Types.ObjectId(strId);
          }); // convert back to ObjectId
          console.log("Admin, Agent & SubAgent IDs:", adminIds);

          // 5. Fetch loan applications where createdBy is in agentIds
          _context14.next = 20;
          return _loanApplication["default"].find({
            createdBy: {
              $in: adminIds
            }
          }).populate('userId', 'id name').populate('createdBy', 'id name') // optional: if you want to show which agent submitted it
          .populate('bankId', 'name').populate('branchId', 'name location').populate('criteriaValues.criteriaId', 'criteriaName');
        case 20:
          applications = _context14.sent;
          console.log("Applications:", applications);
          console.log("admin end");
          return _context14.abrupt("return", {
            admin: admin,
            agents: agents,
            subAgents: subAgents,
            applications: applications
          });
        case 24:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _fetchAdminLoanApplications.apply(this, arguments);
}
function fetchBankOperatorFromLoanApplication(_x27) {
  return _fetchBankOperatorFromLoanApplication.apply(this, arguments);
} // export const processLoanDecision = async ({ loanId, isAccepted, approvedAmount, interestRate, rejectionReason, userId }) => {
//   const app = await LoanApplication.findById(loanId);
//   if (!app) throw new Error('Loan not found');
// console.log(app)
//   // Only bank can act and on pending/resubmitted
//   if (app.status !== 'Pending' && app.status !== 'resubmitted') {
//     throw new Error('Loan not in actionable state');
//   }
//   if (isAccepted) {
//     app.status = 'approved';
//     app.approvedAmount = approvedAmount;
//     app.interestRate = interestRate;
//   } else {
//     app.status = 'rejected';
//     app.rejectionReason = rejectionReason;
//   }
//   app.bankDecisionBy = userId;
//   app.decisionAt = new Date();
//   await app.save();
//   // Notify agent & sub-agent
//   const agentsToNotify = [];
//   if (app.agentId) agentsToNotify.push(app.agentId);
//   if (app.subAgentId) agentsToNotify.push(app.subAgentId);
//   const users = await User.find({ _id: { $in: agentsToNotify } });
//   for (const usr of users) {
//     // Example: add to their notifications array
//     usr.notifications = usr.notifications || [];
//     usr.notifications.push({
//       loanId,
//       type: isAccepted ? 'loan_approved' : 'loan_rejected',
//       message: isAccepted
//         ? `Your loan #${loanId} was approved`
//         : `Your loan #${loanId} was rejected: ${rejectionReason}`,
//       date: new Date(),
//     });
//     await usr.save();
//   }
//   return app;
// };
function _fetchBankOperatorFromLoanApplication() {
  _fetchBankOperatorFromLoanApplication = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee15(applicationId) {
    var _application8$bankDat, _application8$bankDat2, _application8, bankId, branchId, bankOperators;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          console.log("Fetching bank operator for loan application:", applicationId);
          _context15.prev = 1;
          _context15.next = 4;
          return _loanApplication["default"].findById(applicationId);
        case 4:
          _application8 = _context15.sent;
          if (_application8) {
            _context15.next = 7;
            break;
          }
          throw new Error("Loan application not found");
        case 7:
          if (!(!_application8.bankData || _application8.bankData.length === 0)) {
            _context15.next = 9;
            break;
          }
          throw new Error("Loan application does not contain bank data");
        case 9:
          bankId = (_application8$bankDat = _application8.bankData[0]) === null || _application8$bankDat === void 0 ? void 0 : _application8$bankDat.bankId;
          branchId = (_application8$bankDat2 = _application8.bankData[0]) === null || _application8$bankDat2 === void 0 || (_application8$bankDat2 = _application8$bankDat2.branches) === null || _application8$bankDat2 === void 0 || (_application8$bankDat2 = _application8$bankDat2[0]) === null || _application8$bankDat2 === void 0 ? void 0 : _application8$bankDat2.branchId;
          if (!(!bankId || !branchId)) {
            _context15.next = 13;
            break;
          }
          throw new Error("Missing bankId or branchId in loan application");
        case 13:
          _context15.next = 15;
          return _user["default"].find({
            role: 'bankOperator',
            bankId: bankId,
            branches: {
              $in: [branchId]
            }
          }).select('_id fullName email mobileNumber branches bankId');
        case 15:
          bankOperators = _context15.sent;
          if (bankOperators.length === 0) {
            console.log("⚠️ No bank operators found for this branch");
          }
          return _context15.abrupt("return", {
            applicationId: applicationId,
            bankId: bankId,
            branchId: branchId,
            operators: bankOperators
          });
        case 20:
          _context15.prev = 20;
          _context15.t0 = _context15["catch"](1);
          console.error("Error in fetchBankOperatorFromLoanApplication:", _context15.t0.message);
          throw new Error('Failed to fetch bank operator: ' + _context15.t0.message);
        case 24:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[1, 20]]);
  }));
  return _fetchBankOperatorFromLoanApplication.apply(this, arguments);
}
var processLoanDecision = exports.processLoanDecision = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(_ref10) {
    var loanId, isAccepted, approvedAmount, interestRate, rejectionReason, userId, app, existingDecision, decision, agentsToNotify, users, _iterator3, _step3, usr;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          loanId = _ref10.loanId, isAccepted = _ref10.isAccepted, approvedAmount = _ref10.approvedAmount, interestRate = _ref10.interestRate, rejectionReason = _ref10.rejectionReason, userId = _ref10.userId;
          _context10.next = 3;
          return _loanApplication["default"].findById(loanId);
        case 3:
          app = _context10.sent;
          if (app) {
            _context10.next = 6;
            break;
          }
          throw new Error('Loan not found');
        case 6:
          _context10.next = 8;
          return _bank.BankDecision.findOne({
            loanId: loanId,
            bankOperatorId: userId
          });
        case 8:
          existingDecision = _context10.sent;
          if (!existingDecision) {
            _context10.next = 11;
            break;
          }
          throw new Error('You have already submitted a decision for this loan');
        case 11:
          decision = new _bank.BankDecision({
            loanId: loanId,
            bankOperatorId: userId,
            isAccepted: isAccepted,
            approvedAmount: isAccepted ? approvedAmount : undefined,
            interestRate: isAccepted ? interestRate : undefined,
            rejectionReason: !isAccepted ? rejectionReason : undefined
          });
          _context10.next = 14;
          return decision.save();
        case 14:
          // 🟡 Update application status
          if (isAccepted) {
            app.status = 'inprogress';
            app.approvedAmount = approvedAmount;
            app.interestRate = interestRate;
          } else {
            if (rejectionReason && rejectionReason.trim().length > 0) {
              app.status = 'inprogress'; // Treat as Rework
              app.rejectionMessage = rejectionReason;
            } else {
              app.status = 'rejected';
              app.rejectionMessage = null;
            }
          }
          app.bankDecisionBy = userId;
          app.decisionAt = new Date();
          _context10.next = 19;
          return app.save();
        case 19:
          // Notify agent & sub-agent
          agentsToNotify = [];
          if (app.agentId) agentsToNotify.push(app.agentId);
          if (app.subAgentId) agentsToNotify.push(app.subAgentId);
          _context10.next = 24;
          return _user["default"].find({
            _id: {
              $in: agentsToNotify
            }
          });
        case 24:
          users = _context10.sent;
          _iterator3 = _createForOfIteratorHelper(users);
          _context10.prev = 26;
          _iterator3.s();
        case 28:
          if ((_step3 = _iterator3.n()).done) {
            _context10.next = 36;
            break;
          }
          usr = _step3.value;
          usr.notifications = usr.notifications || [];
          usr.notifications.push({
            loanId: loanId,
            type: isAccepted ? 'loan_approved' : 'loan_rejected',
            message: isAccepted ? "Bank decision: loan #".concat(loanId, " approved") : "Bank decision: loan #".concat(loanId, " rejected").concat(rejectionReason ? ' - ' + rejectionReason : ''),
            date: new Date()
          });
          _context10.next = 34;
          return usr.save();
        case 34:
          _context10.next = 28;
          break;
        case 36:
          _context10.next = 41;
          break;
        case 38:
          _context10.prev = 38;
          _context10.t0 = _context10["catch"](26);
          _iterator3.e(_context10.t0);
        case 41:
          _context10.prev = 41;
          _iterator3.f();
          return _context10.finish(41);
        case 44:
          return _context10.abrupt("return", decision);
        case 45:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[26, 38, 41, 44]]);
  }));
  return function processLoanDecision(_x28) {
    return _ref11.apply(this, arguments);
  };
}();

//update loan applications status
var updateLoanApplicationStatus = exports.updateLoanApplicationStatus = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(id, status) {
    var _application7, updatedApplication;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _loanApplication["default"].findById(id);
        case 3:
          _application7 = _context11.sent;
          if (_application7) {
            _context11.next = 6;
            break;
          }
          throw new Error('Loan application not found');
        case 6:
          if (['new', 'pending', "inprogress", "rejected", "completed"].includes(status.toLowerCase())) {
            _context11.next = 8;
            break;
          }
          throw new Error('Invalid status change');
        case 8:
          _application7.status = status;
          _application7.updatedAt = Date.now();
          _context11.next = 12;
          return _application7.save();
        case 12:
          updatedApplication = _context11.sent;
          return _context11.abrupt("return", updatedApplication);
        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](0);
          throw new Error('Error updating loan application status: ' + _context11.t0.message);
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 16]]);
  }));
  return function updateLoanApplicationStatus(_x29, _x30) {
    return _ref12.apply(this, arguments);
  };
}();