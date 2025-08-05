"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _fs = _interopRequireDefault(require("fs"));
var _loanApplication = require("../controllers/loanApplication.controller");
var _auth = require("../middlewares/auth.middleware");
var _validation = require("../middlewares/validation.middleware");
var _parseMultipartData = require("../middlewares/parseMultipartData.js");
// // src/routes/loanApplication.routes.js
// import express from 'express';
// import {
//     createLoanApplication,
//     getAllLoanApplications,
//     getLoanApplicationById,
//     updateLoanApplication,
//     deleteLoanApplication,
//     getLoanApplicationsByUserId,
//     getLoanApplicationsByAgentId,
//     createLoanApplicationDocuments,
//     getVisibleLoanApplications
// } from '../controllers/loanApplication.controller';
// import { authMiddleware, hasRole } from '../middlewares/auth.middleware'; // Import your auth middleware
// import { transformLoanApplicationPayload, validateCreateLoanApplication, validateCreateLoanApplicationDocuments, validateUpdateLoanApplication } from '../middlewares/validation.middleware'; // Import validation middleware
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Configure storage
// // Define the upload directory
// const uploadDir = 'public/uploads/';

// // Ensure the upload directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true creates parent directories if needed
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage: storage });
// const router = express.Router();

// // Routes
// router.post('/', authMiddleware,transformLoanApplicationPayload, validateCreateLoanApplication, createLoanApplication); // User, Agent, SubAgent
// router.post('/upload/:id', authMiddleware,upload.array('documents'), validateCreateLoanApplicationDocuments, createLoanApplicationDocuments);
// router.get('/', authMiddleware, hasRole(['masterAdmin', 'admin', 'bankOperator,agent']), getAllLoanApplications); // Admin, Bank Operator
// router.get('/:id', authMiddleware, getLoanApplicationById); // All authenticated users
// // router.put('/:id', authMiddleware, validateUpdateLoanApplication, updateLoanApplication); // User, Agent, SubAgent
// router.put('/:id', authMiddleware, updateLoanApplication);
// router.delete('/:id', authMiddleware, deleteLoanApplication); // User, Agent, SubAgent
// router.get('/user', authMiddleware, hasRole(['user']), getLoanApplicationsByUserId); // User
// router.get('/:role/:id', authMiddleware, hasRole(['masterAdmin','agent', 'subAgent', 'bankOperator', 'admin','user']), getLoanApplicationsByAgentId); // Agent, SubAgent

// router.get('/visible', authenticate, getVisibleLoanApplications);

// export default router;

var router = _express["default"].Router();
var storage = _multer["default"].memoryStorage();

// ✅ Multer instance
var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
    // ✅ Limit each file to 2MB
    files: 10 // ✅ Max 10 files per request
  }
});

// ✅ Use consistent field names (matching frontend keys)
var multiUpload = upload.fields([{
  name: 'photo',
  maxCount: 1
}, {
  name: 'aadhar',
  maxCount: 2
}, {
  name: 'pancard',
  maxCount: 1
}, {
  name: 'itr',
  maxCount: 5
}, {
  name: 'credit_report',
  maxCount: 5
}]);

// Debug middleware (optional but recommended)
var debugFormMiddleware = function debugFormMiddleware(req, res, next) {
  console.log("🟨 Form Data:");
  console.dir(req.body, {
    depth: null
  });
  console.dir(req.files, {
    depth: null
  });
  next();
};
router.post('/', _auth.authMiddleware, multiUpload, debugFormMiddleware, _parseMultipartData.parseMultipartLoanApplication, _validation.transformLoanApplicationPayload, _loanApplication.createLoanApplicationWithFiles); //validateCreateLoanApplication
router.post('/upload/:id', _auth.authMiddleware, upload.array('documents'), _validation.validateCreateLoanApplicationDocuments, _loanApplication.createLoanApplicationDocuments);
router.get('/', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'admin', 'bankOperator', 'agent']), _loanApplication.getAllLoanApplications);
router.get('/user', _auth.authMiddleware, (0, _auth.hasRole)(['user']), _loanApplication.getLoanApplicationsByUserId);
router.get('/visible', _auth.authMiddleware, _loanApplication.getVisibleLoanApplications);
router.get('/:id', _auth.authMiddleware, _loanApplication.getLoanApplicationById);
//router.put('/:id', authMiddleware, updateLoanApplication);
router.put('/:id', _auth.authMiddleware, multiUpload, debugFormMiddleware, _parseMultipartData.parseMultipartLoanApplication, _loanApplication.updateLoanApplicationWithFiles);
router.patch('/:id/branch', _auth.authMiddleware, _loanApplication.updateLoanApplicationBankBranch);
//updateLoanApplicationStatus
router.put('/statusUpdate/:id', _auth.authMiddleware, _loanApplication.updateLoanApplicationStatus);
router["delete"]('/:id', _auth.authMiddleware, _loanApplication.deleteLoanApplication);
router.get('/:role/:id', _auth.authMiddleware, (0, _auth.hasRole)(['masterAdmin', 'agent', 'subAgent', 'bankOperator', 'admin', 'user']), _loanApplication.getLoanApplicationsByAgentId);
router.post('/:id/decision', _auth.authMiddleware, _loanApplication.submitLoanDecisionController);
var _default = exports["default"] = router;