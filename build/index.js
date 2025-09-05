"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _routes = _interopRequireDefault(require("./routes"));
var _database = _interopRequireDefault(require("./config/database"));
var _error = require("./middlewares/error.middleware");
var _logger = _interopRequireWildcard(require("./config/logger"));
var _morgan = _interopRequireDefault(require("morgan"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
_dotenv["default"].config();
var app = (0, _express["default"])();
var host = process.env.APP_HOST;
var port = process.env.APP_PORT;
var api_version = process.env.API_VERSION;
app.use((0, _cors["default"])());
app.use((0, _helmet["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _morgan["default"])('combined', {
  stream: _logger.logStream
}));
(0, _database["default"])();

// At the end of your middleware stack
app.use(function (err, req, res, next) {
  console.error('Unhandled error:', err.stack);
  if (!res.headersSent) {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});
app.use("/instaFinn", (0, _routes["default"])());
app.use(_error.appErrorHandler);
app.use(_error.genericErrorHandler);
app.use(_error.notFound);
app.listen(port, function () {
  _logger["default"].info("Server started at ".concat(host, ":").concat(port, "/instaFinn/"));
});
var _default = exports["default"] = app;