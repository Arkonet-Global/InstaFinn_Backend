"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
// src/config/config.js

_dotenv["default"].config(); // Load environment variables from .env file

var config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  //  a strong, unguessable secret
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name' //  your MongoDB connection string
};
var _default = exports["default"] = config;