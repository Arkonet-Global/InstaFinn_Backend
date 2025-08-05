"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToCloudinary = exports.deleteFromCloudinaryByUrl = exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = require("cloudinary");
_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var uploadToCloudinary = exports.uploadToCloudinary = function uploadToCloudinary(file, folderPath) {
  return new Promise(function (resolve, reject) {
    if (!file.buffer) {
      return reject(new Error("File buffer is missing"));
    }
    var stream = _cloudinary.v2.uploader.upload_stream({
      folder: folderPath,
      timeout: 120000,
      // 2-minute timeout
      resource_type: 'auto' // handles all file types (image/pdf/etc.)
    }, function (error, result) {
      if (error) return reject(error);
      // Free buffer only after upload completes
      resolve({
        name: file.originalname,
        url: result.secure_url,
        type: file.fieldname
      });
      file.buffer = null; // ✅ Move this line here
    });
    stream.end(file.buffer); // ✅ Use the buffer first
  });
};
var deleteFromCloudinaryByUrl = exports.deleteFromCloudinaryByUrl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var regex, match, publicId, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          regex = /\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|pdf|webp)/;
          match = url.match(regex);
          if (!(!match || !match[1])) {
            _context.next = 6;
            break;
          }
          console.error("❌ Failed to extract public_id from URL:", url);
          return _context.abrupt("return");
        case 6:
          publicId = match[1]; // Everything after 'upload/v123/' and before extension
          _context.next = 9;
          return _cloudinary.v2.uploader.destroy(publicId);
        case 9:
          result = _context.sent;
          console.log('✅ Deleted from Cloudinary:', publicId, result);
          return _context.abrupt("return", result);
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error('❌ Cloudinary Delete Error:', _context.t0.message);
          throw _context.t0;
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function deleteFromCloudinaryByUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = _cloudinary.v2;