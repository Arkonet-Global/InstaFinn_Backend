"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeRole = normalizeRole;
function normalizeRole(role) {
  if (typeof role !== 'string') return role;
  var roleMap = {
    masteradmin: 'masterAdmin',
    admin: 'admin',
    agent: 'agent',
    subagent: 'subAgent',
    user: 'user',
    bankoperator: 'bankOperator'
  };
  return roleMap[role.toLowerCase()] || role;
}