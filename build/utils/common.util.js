"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = require("cloudinary");
(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var uploadResult, optimizeUrl, autoCropUrl;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        // Configuration
        _cloudinary.v2.config({
          cloud_name: 'dkfu1tksm',
          api_key: '713562637782583',
          api_secret: '5-uo0vlpe45qTE5r_CJPm3dmOA0' // Click 'View API Keys' above to copy your API secret
        });

        // Upload an image
        _context.next = 3;
        return _cloudinary.v2.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
          public_id: 'shoes'
        })["catch"](function (error) {
          console.log(error);
        });
      case 3:
        uploadResult = _context.sent;
        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        optimizeUrl = _cloudinary.v2.url('shoes', {
          fetch_format: 'auto',
          quality: 'auto'
        });
        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        autoCropUrl = _cloudinary.v2.url('shoes', {
          crop: 'auto',
          gravity: 'auto',
          width: 500,
          height: 500
        });
        console.log(autoCropUrl);
      case 9:
      case "end":
        return _context.stop();
    }
  }, _callee);
}))();