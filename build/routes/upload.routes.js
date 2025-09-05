"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _cloudinaryUploader = _interopRequireDefault(require("../config/cloudinaryUploader"));
var router = _express["default"].Router();

// Upload multiple files (photo, aadhar, etc.)
router.post('/loan/upload/:id', _cloudinaryUploader["default"].fields([{
  name: 'photo',
  maxCount: 1
}, {
  name: 'aadharcard',
  maxCount: 2
}, {
  name: 'pancard',
  maxCount: 1
}, {
  name: 'incomeTaxReturn',
  maxCount: 5
}, {
  name: 'creditReport',
  maxCount: 1
}]), /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var files, uploadedFiles;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            files = req.files;
            uploadedFiles = [];
            Object.keys(files).forEach(function (field) {
              files[field].forEach(function (file) {
                uploadedFiles.push({
                  name: field,
                  url: file.path,
                  type: file.mimetype
                });
              });
            });
            res.status(200).json({
              message: 'Files uploaded successfully',
              files: uploadedFiles
            });
          } catch (error) {
            res.status(500).json({
              error: 'Upload failed',
              details: error.message
            });
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;