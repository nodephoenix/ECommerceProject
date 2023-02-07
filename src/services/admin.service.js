"use strict";
// @ts-check

const AdminRepository = require("../repository/admin.repository.js");

class AdminService {
  adminRepository = new AdminRepository();

  constructor() {
    this.registerProducts = this.registerProducts.bind(this);
    this.editProducts = this.editProducts.bind(this);
    this.deleteProducts = this.deleteProducts.bind(this);
    this.getOrderProducts = this.getOrderProducts.bind(this);
    this.putProductsStatus = this.putProductsStatus.bind(this);
    this.putUserGrade = this.putUserGrade.bind(this);
  }

  /**
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  async registerProducts(body) {
    return this.adminRepository.registerProducts(body);
  }

  /**
   * @param {number} productId
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  async editProducts(productId, body) {
    return this.adminRepository.editProducts(productId, body);
  }

  /**
   * @param {number} productId
   */
  async deleteProducts(productId) {
    return this.adminRepository.deleteProducts(productId);
  }

  async getOrderProducts() {
    return this.adminRepository.getOrderProducts();
  }

  /**
   *
   * @param {number} productId
   * @param {string} status
   */
  async putProductsStatus(productId, status) {
    return this.adminRepository.putProductsStatus(productId, status);
  }

  async putOrderStatus(orderId) {
    const orderData = await this.adminRepository.findOrder(orderId);
    const orderStatus = orderData.status;
    if (orderStatus === 4) {
      return { message: "상태 변경 불가" };
    }
    orderData.status = orderStatus + 1;
    const orderChangeData = await this.adminRepository.putOrderStatus(
      orderData
    );
    return { message: "상태 변경 완료" };
  }

  /**
   *
   * @param {number} userId
   * @param {number} grade
   */
  async putUserGrade(userId, grade) {
    return this.adminRepository.putUserGrade(userId, grade);
  }
}

module.exports = AdminService;
