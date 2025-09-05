"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logStream = exports["default"] = void 0;
var _winston = _interopRequireWildcard(require("winston"));
require("winston-daily-rotate-file");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/**
 * Logger handles all logs in the application
 */
var logger = _winston["default"].createLogger({
  format: _winston.format.combine(_winston.format.timestamp(), _winston.format.simple()),
  colorize: true,
  transports: [new _winston["default"].transports.File({
    filename: 'logs/server/error.log',
    level: 'error',
    handleExceptions: true
  }), new _winston["default"].transports.File({
    filename: 'logs/server/all.log',
    level: 'info',
    handleExceptions: true
  }), new _winston["default"].transports.DailyRotateFile({
    maxFiles: '14d',
    level: 'info',
    dirname: 'logs/server/daily',
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%.log'
  }), new _winston["default"].transports.Console({
    level: 'debug',
    json: false,
    handleExceptions: true
  })]
});

/**
 * morganLogger logs all http request in a dedicated file and on console
 */
var morganLogger = _winston["default"].createLogger({
  format: _winston.format.combine(_winston.format.simple()),
  transports: [new _winston["default"].transports.File({
    filename: 'logs/requests/all.log',
    level: 'debug',
    handleExceptions: true
  }), new _winston["default"].transports.Console({
    level: 'debug',
    json: false,
    handleExceptions: true
  }), new _winston["default"].transports.DailyRotateFile({
    maxFiles: '14d',
    level: 'info',
    dirname: 'logs/requests/daily',
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%.log'
  })]
});
var logStream = exports.logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write: function write(message) {
    morganLogger.info(message.toString());
  }
};
var _default = exports["default"] = logger;