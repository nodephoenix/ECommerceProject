"use strict";
// @ts-check

const AdminRepository = require("../repository/admin.repository.js");

class AdminService {
  adminRepository = new AdminRepository();

  /**
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  registerProducts = async (body) => {
    return this.adminRepository.registerProducts(body);
  };

  /**
   * @param {number} productId
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  editProducts = async (productId, body) => {
    return this.adminRepository.editProducts(productId, body);
  };

  /**
   * @param {number} productId
   */
  deleteProducts = async (productId) => {
    return this.adminRepository.deleteProducts(productId);
  };

  getOrderProducts = async () => {
    return this.adminRepository.getOrderProducts();
  };

  /**
   *
   * @param {number} productId
   * @param {string} status
   */
  putProductsStatus = async (productId, status) => {
    return this.adminRepository.putProductsStatus(productId, status);
  };

  /**
   *
   * @param {number} userId
   * @param {number} grade
   */
  putUserGrade = async (userId, grade) => {
    return this.adminRepository.putUserGrade(userId, grade);
  };
}

module.exports = AdminService;
