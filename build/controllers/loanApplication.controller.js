"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoanApplicationWithFiles = exports.updateLoanApplicationStatus = exports.updateLoanApplicationBankBranch = exports.submitLoanDecisionController = exports.getVisibleLoanApplications = exports.getLoanApplicationsByUserId = exports.getLoanApplicationsByAgentId = exports.getLoanApplicationById = exports.getAllLoanApplications = exports.deleteLoanApplication = exports.createLoanApplicationWithFiles = exports.createLoanApplicationDocuments = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _loanApplicationService = require("../services/loanApplication.service.js");
var _loanApplicationModel = _interopRequireDefault(require("../models/loanApplication.model.js"));
var _userModel = _interopRequireDefault(require("../models/user.model.js"));
var _express = require("express");
var _cloudinary = _interopRequireWildcard(require("../config/cloudinary.js"));
var _fs = require("fs");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var createLoanApplicationWithFiles = exports.createLoanApplicationWithFiles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$user, safeParse, personalInfo, familyInfo, employmentInfo, loanDetails, propertyInvestment, references, criteriaValues, creditScore, userId, createdBy, parseDate, applicationPayload, application, uploadedDocuments, fileUploadPromises, field, files, _iterator, _step, file, uploadPromise, results, _req$user2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Safe parse function
          safeParse = function safeParse(input) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            if (typeof input === "string") {
              try {
                return JSON.parse(input);
              } catch (e) {
                console.error("\u274C JSON Parse Error for ".concat(key, ":"), input);
                return {};
              }
            }
            return input;
          }; // ✅ Parse fields
          personalInfo = safeParse(req.body.personalInfo, "personalInfo");
          familyInfo = safeParse(req.body.familyInfo, "familyInfo");
          employmentInfo = safeParse(req.body.employmentInfo, "employmentInfo");
          loanDetails = safeParse(req.body.loanDetails, "loanDetails");
          propertyInvestment = safeParse(req.body.propertyInvestment, "propertyInvestment");
          references = safeParse(req.body.references, "references");
          criteriaValues = safeParse(req.body.criteriaValues, "criteriaValues");
          creditScore = req.body.creditScore ? parseInt(req.body.creditScore, 10) : null;
          userId = req.body.userId;
          createdBy = req.body.createdBy;
          parseDate = function parseDate(str) {
            return str ? new Date(str) : null;
          };
          if (personalInfo.applicantDob) personalInfo.applicantDob = parseDate(personalInfo.applicantDob);
          if (familyInfo.spouseDOB) familyInfo.spouseDOB = parseDate(familyInfo.spouseDOB);
          if (familyInfo.fatherDOB) familyInfo.fatherDOB = parseDate(familyInfo.fatherDOB);
          if (familyInfo.motherDOB) familyInfo.motherDOB = parseDate(familyInfo.motherDOB);
          if (familyInfo.childrenCount) familyInfo.childrenCount = parseInt(familyInfo.childrenCount, 10);
          if (loanDetails.loanAmount) loanDetails.loanAmount = parseInt(loanDetails.loanAmount, 10);
          if (loanDetails.emiAmount) loanDetails.emiAmount = parseInt(loanDetails.emiAmount, 10);
          applicationPayload = {
            userId: userId,
            createdBy: createdBy,
            personalInfo: personalInfo,
            familyInfo: familyInfo,
            employmentInfo: employmentInfo,
            loanDetails: loanDetails,
            propertyInvestment: propertyInvestment,
            creditScore: creditScore,
            references: references,
            criteriaValues: criteriaValues,
            collateral: req.body.collateral,
            collateralDescription: req.body.collateralDescription
          }; // ✅ Save the application
          _context.next = 23;
          return (0, _loanApplicationService.createLoanApplication)(applicationPayload, ((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.id) || userId);
        case 23:
          application = _context.sent;
          // ✅ Upload files concurrently
          uploadedDocuments = [];
          if (!(req.files && Object.keys(req.files).length > 0)) {
            _context.next = 32;
            break;
          }
          fileUploadPromises = [];
          for (field in req.files) {
            files = req.files[field];
            _iterator = _createForOfIteratorHelper(files);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                file = _step.value;
                uploadPromise = (0, _cloudinary.uploadToCloudinary)(file, "loan_documents/".concat(application._id, "/").concat(field));
                fileUploadPromises.push(uploadPromise);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          // Upload all at once
          _context.next = 30;
          return Promise.all(fileUploadPromises);
        case 30:
          results = _context.sent;
          uploadedDocuments.push.apply(uploadedDocuments, (0, _toConsumableArray2["default"])(results));
        case 32:
          if (!(uploadedDocuments.length > 0)) {
            _context.next = 35;
            break;
          }
          _context.next = 35;
          return (0, _loanApplicationService.createLoanApplicationDocumentService)({
            applicationId: application._id,
            documents: uploadedDocuments
          }, ((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.id) || userId);
        case 35:
          res.status(201).json({
            message: "Loan application created with files successfully",
            data: application
          });
          _context.next = 42;
          break;
        case 38:
          _context.prev = 38;
          _context.t0 = _context["catch"](0);
          console.error("❌ [LoanApp Error]", _context.t0);
          res.status(500).json({
            message: "Failed to create loan application with files",
            error: _context.t0.message
          });
        case 42:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 38]]);
  }));
  return function createLoanApplicationWithFiles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createLoanApplicationDocuments = exports.createLoanApplicationDocuments = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var applicationId, documents, userId, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          applicationId = req.params.id;
          documents = req.body.documents;
          userId = req.user.id;
          _context2.next = 6;
          return (0, _loanApplicationService.createLoanApplicationDocumentService)({
            applicationId: applicationId,
            documents: documents
          }, userId);
        case 6:
          result = _context2.sent;
          res.status(201).json({
            message: 'Documents uploaded successfully',
            data: result
          });
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('Error uploading documents:', _context2.t0);
          res.status(500).json({
            message: _context2.t0.message
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function createLoanApplicationDocuments(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //

// ✅ Get all applications
var getAllLoanApplications = exports.getAllLoanApplications = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var applications;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _loanApplicationService.getAllLoanApplications)();
        case 3:
          applications = _context3.sent;
          res.status(200).json(applications);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getAllLoanApplications(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// ✅ Get by ID
var getLoanApplicationById = exports.getLoanApplicationById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var application;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _loanApplicationService.getLoanApplicationById)(req.params.id);
        case 3:
          application = _context4.sent;
          res.status(200).json(application);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(404).json({
            message: _context4.t0.message
          });
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function getLoanApplicationById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var updateLoanApplicationWithFiles = exports.updateLoanApplicationWithFiles = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var loanId, role, userId, safeParse, personalInfo, familyInfo, employmentInfo, loanDetails, propertyInvestment, references, criteriaValues, data, removedFiles, creditScore, updateData, application, applicationDocs, _iterator2, _step2, removed, uploadedDocuments, fileUploadPromises, field, _iterator3, _step3, file, uploadPromise, results, _loop, _i, _uploadedDocuments, finalDocuments, updatedApp;
    return _regenerator["default"].wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          loanId = req.params.id;
          role = req.user.role;
          userId = req.user._id; // ✅ Parse JSON safely
          safeParse = function safeParse(input) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            if (typeof input === "string") {
              try {
                return JSON.parse(input);
              } catch (e) {
                console.error("\u274C JSON Parse Error for ".concat(key, ":"), input);
                return {};
              }
            }
            return input;
          }; // ✅ Extract and parse all form fields
          personalInfo = safeParse(req.body.personalInfo, "personalInfo");
          familyInfo = safeParse(req.body.familyInfo, "familyInfo");
          employmentInfo = safeParse(req.body.employmentInfo, "employmentInfo");
          loanDetails = safeParse(req.body.loanDetails, "loanDetails");
          propertyInvestment = safeParse(req.body.propertyInvestment, "propertyInvestment");
          references = safeParse(req.body.references, "references");
          criteriaValues = safeParse(req.body.criteriaValues, "criteriaValues");
          data = safeParse(req.body.data, "data"); // bankData
          removedFiles = safeParse(req.body.removedFiles, "removedFiles") || [];
          creditScore = req.body.creditScore ? parseInt(req.body.creditScore, 10) : null;
          updateData = {
            personalInfo: personalInfo,
            familyInfo: familyInfo,
            employmentInfo: employmentInfo,
            loanDetails: loanDetails,
            propertyInvestment: propertyInvestment,
            creditScore: creditScore,
            references: references,
            criteriaValues: criteriaValues,
            collateral: req.body.collateral,
            collateralDescription: req.body.collateralDescription,
            data: data
          }; // 🔍 Fetch current application for existing documents
          _context6.next = 18;
          return _loanApplicationModel["default"].findById(loanId);
        case 18:
          application = _context6.sent;
          if (application) {
            _context6.next = 21;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            error: "Loan application not found"
          }));
        case 21:
          applicationDocs = application.documents || []; // ✅ Delete removed files from Cloudinary
          _iterator2 = _createForOfIteratorHelper(removedFiles);
          _context6.prev = 23;
          _iterator2.s();
        case 25:
          if ((_step2 = _iterator2.n()).done) {
            _context6.next = 32;
            break;
          }
          removed = _step2.value;
          if (!removed.url) {
            _context6.next = 30;
            break;
          }
          _context6.next = 30;
          return (0, _cloudinary.deleteFromCloudinaryByUrl)(removed.url);
        case 30:
          _context6.next = 25;
          break;
        case 32:
          _context6.next = 37;
          break;
        case 34:
          _context6.prev = 34;
          _context6.t0 = _context6["catch"](23);
          _iterator2.e(_context6.t0);
        case 37:
          _context6.prev = 37;
          _iterator2.f();
          return _context6.finish(37);
        case 40:
          // ✅ Upload new files to Cloudinary
          uploadedDocuments = [];
          if (!(req.files && Object.keys(req.files).length > 0)) {
            _context6.next = 48;
            break;
          }
          fileUploadPromises = [];
          for (field in req.files) {
            _iterator3 = _createForOfIteratorHelper(req.files[field]);
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                file = _step3.value;
                uploadPromise = (0, _cloudinary.uploadToCloudinary)(file, "loan_documents/".concat(loanId, "/").concat(field));
                fileUploadPromises.push(uploadPromise);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
          _context6.next = 46;
          return Promise.all(fileUploadPromises);
        case 46:
          results = _context6.sent;
          uploadedDocuments.push.apply(uploadedDocuments, (0, _toConsumableArray2["default"])(results));
        case 48:
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
            var uploaded, oldDoc;
            return _regenerator["default"].wrap(function _loop$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  uploaded = _uploadedDocuments[_i];
                  oldDoc = applicationDocs.find(function (doc) {
                    return doc.type === uploaded.type;
                  });
                  if (!(oldDoc && oldDoc.url)) {
                    _context5.next = 5;
                    break;
                  }
                  _context5.next = 5;
                  return (0, _cloudinary.deleteFromCloudinaryByUrl)(oldDoc.url);
                case 5:
                case "end":
                  return _context5.stop();
              }
            }, _loop);
          });
          _i = 0, _uploadedDocuments = uploadedDocuments;
        case 50:
          if (!(_i < _uploadedDocuments.length)) {
            _context6.next = 55;
            break;
          }
          return _context6.delegateYield(_loop(), "t1", 52);
        case 52:
          _i++;
          _context6.next = 50;
          break;
        case 55:
          // ✅ Construct final documents list: exclude removed and replaced files
          finalDocuments = [].concat((0, _toConsumableArray2["default"])(applicationDocs.filter(function (doc) {
            return !removedFiles.some(function (r) {
              return r.url === doc.url;
            }) && !uploadedDocuments.some(function (u) {
              return u.type === doc.type;
            });
          })), uploadedDocuments);
          updateData.documents = finalDocuments;

          // ✅ Call update service
          _context6.next = 59;
          return (0, _loanApplicationService.updateLoanApplicationWithFilesService)(loanId, updateData, role, userId);
        case 59:
          updatedApp = _context6.sent;
          res.status(200).json({
            message: "Loan application updated successfully",
            data: updatedApp
          });
          _context6.next = 67;
          break;
        case 63:
          _context6.prev = 63;
          _context6.t2 = _context6["catch"](0);
          console.error("❌ Error updating loan application:", _context6.t2.message);
          res.status(500).json({
            error: _context6.t2.message
          });
        case 67:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[0, 63], [23, 34, 37, 40]]);
  }));
  return function updateLoanApplicationWithFiles(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var updateLoanApplicationBankBranch = exports.updateLoanApplicationBankBranch = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var loanId, role, userId, updateData, updatedApp;
    return _regenerator["default"].wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          loanId = req.params.id;
          role = req.user.role;
          userId = req.user._id;
          updateData = req.body;
          _context7.next = 7;
          return (0, _loanApplicationService.updateLoanApplicationBranchService)(loanId, updateData, role, userId);
        case 7:
          updatedApp = _context7.sent;
          res.status(200).json({
            message: "Bank branch updated successfully",
            data: updatedApp
          });
          _context7.next = 15;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error("❌ Error updating bank branch:", _context7.t0.message);
          res.status(500).json({
            error: _context7.t0.message
          });
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function updateLoanApplicationBankBranch(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

// export const updateLoanApplication = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const role = req.user.role;
//     const userId = req.user.id;

//     // 🛡️ Authorization and role-based logic stays the same

//     // 🔧 Parse formData safely like createLoanApplicationWithFiles
//     const safeParse = (input, key = "") => {
//       if (typeof input === "string") {
//         try {
//           return JSON.parse(input);
//         } catch (e) {
//           console.error(`❌ JSON Parse Error for ${key}:`, input);
//           return {};
//         }
//       }
//       return input;
//     };
//     console.log("🔧 Update Request:", req.params, req.body, req.files, id, role,userId,req);
//     console.log("🔧 Update Payload:", req.body);
//     console.log("🔧 Update Files:", req.files);

//     const personalInfo = safeParse(req.body.personalInfo, "personalInfo");
//     const familyInfo = safeParse(req.body.familyInfo, "familyInfo");
//     const employmentInfo = safeParse(req.body.employmentInfo, "employmentInfo");
//     const loanDetails = safeParse(req.body.loanDetails, "loanDetails");
//     const propertyInvestment = safeParse(req.body.propertyInvestment, "propertyInvestment");
//     const references = safeParse(req.body.references, "references");
//     const criteriaValues = safeParse(req.body.criteriaValues, "criteriaValues");

//     const creditScore = req.body.creditScore ? parseInt(req.body.creditScore, 10) : null;
//     const updatedData = {
//       personalInfo,
//       familyInfo,
//       employmentInfo,
//       loanDetails,
//       propertyInvestment,
//       creditScore,
//       references,
//       criteriaValues,
//       collateral: req.body.collateral,
//       collateralDescription: req.body.collateralDescription,
//     };
// console.log("🔧 Update Payload:", updatedData);
//     // 📁 Handle updated file uploads
//     const uploadedDocuments = [];
//     if (req.files && Object.keys(req.files).length > 0) {
//       for (const field in req.files) {
//         const fileArray = req.files[field];
//         for (const file of fileArray) {
//           const result = await cloudinary.uploader.upload(file.path, {
//             folder: `loan_documents/${id}/${field}`,
//           });

//           uploadedDocuments.push({
//             name: file.originalname,
//             url: result.secure_url,
//             type: field,
//           });
//         }
//       }
//     }
//     console.log("📂 Uploaded Documents:", uploadedDocuments);

//     if (uploadedDocuments.length > 0) {
//       await LoanApplication.findByIdAndUpdate(id, {
//         $push: { documents: { $each: uploadedDocuments } },
//       });
//     }

//     const updatedApp = await updateLoanApplicationService(id, req, role, userId);

//     res.status(200).json({ message: "Application updated successfully", data: updatedApp });
//   } catch (error) {
//     console.error("❌ Error updating application:", error);
//     res.status(400).json({ message: "Error updating loan application: " + error.message });
//   }
// };

// ✅ Delete

var deleteLoanApplication = exports.deleteLoanApplication = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var role, userId, result;
    return _regenerator["default"].wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          role = req.user.role;
          userId = req.user.id;
          _context8.next = 5;
          return (0, _loanApplicationService.deleteLoanApplication)(req.params.id, role, userId);
        case 5:
          result = _context8.sent;
          res.status(200).json(result);
          _context8.next = 12;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            message: _context8.t0.message
          });
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function deleteLoanApplication(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

// ✅ Get by user ID
var getLoanApplicationsByUserId = exports.getLoanApplicationsByUserId = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var userId, applications;
    return _regenerator["default"].wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          userId = req.user.id;
          _context9.next = 4;
          return (0, _loanApplicationService.getLoanApplicationsByUserId)(userId);
        case 4:
          applications = _context9.sent;
          res.status(200).json(applications);
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            message: _context9.t0.message
          });
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function getLoanApplicationsByUserId(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

// ✅ Get by agent ID
var getLoanApplicationsByAgentId = exports.getLoanApplicationsByAgentId = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var agentId, agentRole, applications;
    return _regenerator["default"].wrap(function _callee9$(_context0) {
      while (1) switch (_context0.prev = _context0.next) {
        case 0:
          _context0.prev = 0;
          agentId = req.user._id;
          agentRole = req.user.role;
          _context0.next = 5;
          return (0, _loanApplicationService.getLoanApplicationsByAgentId)(agentRole, agentId);
        case 5:
          applications = _context0.sent;
          res.status(200).json({
            message: "Loan applications retrieved successfully",
            data: applications
          });
          _context0.next = 12;
          break;
        case 9:
          _context0.prev = 9;
          _context0.t0 = _context0["catch"](0);
          res.status(500).json({
            message: _context0.t0.message
          });
        case 12:
        case "end":
          return _context0.stop();
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function getLoanApplicationsByAgentId(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
var getVisibleLoanApplications = exports.getVisibleLoanApplications = /*#__PURE__*/function () {
  var _ref0 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee0(req, res) {
    var role, userId, query, subAgents, agents, agentIds, _subAgents, subAgentIds, branchIds, loanApplications;
    return _regenerator["default"].wrap(function _callee0$(_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          _context1.prev = 0;
          role = req.user.role;
          userId = req.user._id;
          query = {};
          if (!(role === 'subAgent')) {
            _context1.next = 8;
            break;
          }
          query.createdBy = userId;
          _context1.next = 33;
          break;
        case 8:
          if (!(role === 'agent')) {
            _context1.next = 15;
            break;
          }
          _context1.next = 11;
          return _userModel["default"].find({
            createdBy: userId,
            role: 'subAgent'
          }).select('_id');
        case 11:
          subAgents = _context1.sent;
          query.createdBy = {
            $in: [userId].concat((0, _toConsumableArray2["default"])(subAgents.map(function (u) {
              return u._id;
            })))
          };
          _context1.next = 33;
          break;
        case 15:
          if (!(role === 'admin')) {
            _context1.next = 27;
            break;
          }
          _context1.next = 18;
          return _userModel["default"].find({
            createdBy: userId,
            role: 'agent'
          }).select('_id');
        case 18:
          agents = _context1.sent;
          agentIds = agents.map(function (a) {
            return a._id;
          });
          _context1.next = 22;
          return _userModel["default"].find({
            createdBy: {
              $in: agentIds
            },
            role: 'subAgent'
          }).select('_id');
        case 22:
          _subAgents = _context1.sent;
          subAgentIds = _subAgents.map(function (sa) {
            return sa._id;
          }); // ✅ Include both agents and sub-agents
          query.createdBy = {
            $in: [].concat((0, _toConsumableArray2["default"])(agentIds), (0, _toConsumableArray2["default"])(subAgentIds))
          };
          _context1.next = 33;
          break;
        case 27:
          if (!(role === 'bankOperator')) {
            _context1.next = 33;
            break;
          }
          // console.log("Bank operator branchIds:", branchIds);
          // console.log("Final query for loan apps:", JSON.stringify(query, null, 2));
          branchIds = req.user.branches || (req.user.branchId ? [req.user.branchId] : []);
          console.log("Bank operator branchIds:", branchIds);
          if (!(branchIds.length === 0)) {
            _context1.next = 32;
            break;
          }
          return _context1.abrupt("return", res.status(400).json({
            message: "Bank operator has no branch assigned."
          }));
        case 32:
          query = {
            bankData: {
              $elemMatch: {
                branches: {
                  $elemMatch: {
                    branchId: {
                      $in: branchIds
                    }
                  }
                }
              }
            }
          };
        case 33:
          _context1.next = 35;
          return _loanApplicationModel["default"].find(query).populate('userId agentId').populate('bankData.bankId', 'bankName') // ✅ populate bank name
          .populate('bankData.branches.branchId', 'bankBranch');
        case 35:
          loanApplications = _context1.sent;
          res.status(200).json({
            message: 'Loan applications fetched successfully',
            data: loanApplications
          });
          _context1.next = 43;
          break;
        case 39:
          _context1.prev = 39;
          _context1.t0 = _context1["catch"](0);
          console.error('Error fetching loan applications:', _context1.t0);
          res.status(500).json({
            message: 'Error fetching loan applications',
            error: _context1.t0.message
          });
        case 43:
        case "end":
          return _context1.stop();
      }
    }, _callee0, null, [[0, 39]]);
  }));
  return function getVisibleLoanApplications(_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}();
var submitLoanDecisionController = exports.submitLoanDecisionController = /*#__PURE__*/function () {
  var _ref1 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee1(req, res) {
    var loanId, _req$body, isAccepted, approvedAmount, interestRate, rejectionReason, userId, result;
    return _regenerator["default"].wrap(function _callee1$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          loanId = req.params.id;
          _req$body = req.body, isAccepted = _req$body.isAccepted, approvedAmount = _req$body.approvedAmount, interestRate = _req$body.interestRate, rejectionReason = _req$body.rejectionReason;
          userId = req.user._id;
          _context10.next = 6;
          return (0, _loanApplicationService.processLoanDecision)({
            loanId: loanId,
            isAccepted: isAccepted,
            approvedAmount: approvedAmount,
            interestRate: interestRate,
            rejectionReason: rejectionReason,
            userId: userId
          });
        case 6:
          result = _context10.sent;
          res.status(200).json({
            message: 'Decision recorded',
            data: result
          });
          _context10.next = 14;
          break;
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);
          res.status(400).json({
            message: _context10.t0.message
          });
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee1, null, [[0, 10]]);
  }));
  return function submitLoanDecisionController(_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}();

//updateLoanApplicationStatus
var updateLoanApplicationStatus = exports.updateLoanApplicationStatus = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var loanId, status, updatedApplication;
    return _regenerator["default"].wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          loanId = req.params.id;
          status = req.body.status; // e.g., 'Approved', 'Rejected', 'Pending'
          console.log("🔧 Update Loan Status:", loanId, status, req.user);
          if (status) {
            _context11.next = 6;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: 'Status is required'
          }));
        case 6:
          _context11.next = 8;
          return (0, _loanApplicationService.updateLoanApplicationStatus)(loanId, status, req.user.role, req.user._id);
        case 8:
          updatedApplication = _context11.sent;
          console.log("🔧 Updated Application:", updatedApplication);
          if (updatedApplication) {
            _context11.next = 12;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: 'Loan application not found'
          }));
        case 12:
          res.status(200).json({
            message: 'Loan application status updated successfully',
            data: updatedApplication
          });
          _context11.next = 19;
          break;
        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](0);
          console.error('Error updating loan application status:', _context11.t0);
          res.status(500).json({
            message: _context11.t0.message
          });
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee10, null, [[0, 15]]);
  }));
  return function updateLoanApplicationStatus(_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();