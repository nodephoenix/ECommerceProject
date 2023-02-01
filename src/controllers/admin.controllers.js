"use strict";

const AdminService = require('../services/admin.service.js');

class AdminController {
    adminService = new AdminService();
    
}

module.exports = AdminController;