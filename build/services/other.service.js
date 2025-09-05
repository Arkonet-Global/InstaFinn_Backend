"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoanApplicationStatus = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _loanApplication = _interopRequireDefault(require("../models/loanApplication.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
var getLoanApplicationStatus = exports.getLoanApplicationStatus = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(userId, role) {
    var userBranches,
      status,
      applications,
      subAgents,
      subAgentIds,
      uniqueApplications,
      _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          userBranches = _args.length > 2 && _args[2] !== undefined ? _args[2] : [];
          // Service to get loan application status based on user role
          status = [{
            id: 0,
            key: "new",
            status: "New Applications",
            count: 0
          }, {
            id: 1,
            key: "pending",
            status: "Pending Applications",
            count: 0
          }, {
            id: 2,
            key: "inprogress",
            status: "In Progress Applications",
            count: 0
          }, {
            id: 3,
            key: "rejected",
            status: "Rejected Applications",
            count: 0
          }, {
            id: 4,
            key: "completed",
            status: "Completed Applications",
            count: 0
          }];
          _context.prev = 2;
          console.log("Fetching loan application status for user:", userId, "with role:", role);
          applications = [];
          if (!(role === 'user')) {
            _context.next = 11;
            break;
          }
          _context.next = 8;
          return _loanApplication["default"].find({
            userId: userId
          }).select('status');
        case 8:
          applications = _context.sent;
          _context.next = 43;
          break;
        case 11:
          if (!(role === 'subAgent')) {
            _context.next = 17;
            break;
          }
          _context.next = 14;
          return _loanApplication["default"].find({
            createdBy: userId
          }).select('status');
        case 14:
          applications = _context.sent;
          _context.next = 43;
          break;
        case 17:
          if (!(role === 'agent')) {
            _context.next = 27;
            break;
          }
          _context.next = 20;
          return _user["default"].find({
            createdBy: userId
          }).select('_id');
        case 20:
          subAgents = _context.sent;
          subAgentIds = subAgents.map(function (agent) {
            return agent._id;
          });
          _context.next = 24;
          return _loanApplication["default"].find({
            $or: [{
              createdBy: userId
            },
            // Applications created by agent
            {
              createdBy: {
                $in: subAgentIds
              }
            } // Applications by subagents created by agent
            ]
          }).select('status');
        case 24:
          applications = _context.sent;
          _context.next = 43;
          break;
        case 27:
          if (!(role === 'bankOperator')) {
            _context.next = 36;
            break;
          }
          if (!(!userBranches || userBranches.length === 0)) {
            _context.next = 31;
            break;
          }
          console.warn("⚠️ BankOperator has no branches assigned");
          return _context.abrupt("return", status);
        case 31:
          _context.next = 33;
          return _loanApplication["default"].find({
            bankData: {
              $elemMatch: {
                branches: {
                  $elemMatch: {
                    branchId: {
                      $in: userBranches
                    }
                  }
                }
              }
            }
          }).select('status');
        case 33:
          applications = _context.sent;
          _context.next = 43;
          break;
        case 36:
          if (!(role === 'admin' || role === 'masterAdmin')) {
            _context.next = 42;
            break;
          }
          _context.next = 39;
          return _loanApplication["default"].find().select('status');
        case 39:
          applications = _context.sent;
          _context.next = 43;
          break;
        case 42:
          throw new Error('Unauthorized: Invalid role');
        case 43:
          // 🔁 Remove duplicate applications by _id
          uniqueApplications = new Map();
          applications.forEach(function (app) {
            uniqueApplications.set(app._id.toString(), app);
          });

          // ✅ Count each unique application's status
          (0, _toConsumableArray2["default"])(uniqueApplications.values()).forEach(function (app) {
            var match = status.find(function (s) {
              var _s$key, _app$status;
              return ((_s$key = s.key) === null || _s$key === void 0 ? void 0 : _s$key.toLowerCase()) === ((_app$status = app.status) === null || _app$status === void 0 ? void 0 : _app$status.toLowerCase());
            });
            if (match) {
              match.count += 1;
            }
          });
          return _context.abrupt("return", status);
        case 49:
          _context.prev = 49;
          _context.t0 = _context["catch"](2);
          throw new Error('Error retrieving loan application status: ' + _context.t0.message);
        case 52:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 49]]);
  }));
  return function getLoanApplicationStatus(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();