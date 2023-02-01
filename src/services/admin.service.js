"use strict";

const AdminRepository = require("../repository/admin.repository.js");

class AdminService {
  adminRepository = new AdminRepository();

}

module.exports = AdminService;
