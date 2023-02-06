"use strict";
// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

const AdminService = require("../services/admin.service.js");

class AdminController {
  adminService = new AdminService();

  constructor() {
    this.registerProducts = this.registerProducts.bind(this);
    this.editProducts = this.editProducts.bind(this);
    this.deleteProducts = this.deleteProducts.bind(this);
    this.getOrderProducts = this.getOrderProducts.bind(this);
    this.putProductsStatus = this.putProductsStatus.bind(this);
    this.putUserGrade = this.putUserGrade.bind(this);
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async registerProducts(req, res, next) {
    /** @type {{productName: string; desc: string; price: number; image: string;}} */
    const body = req.body;
    await this.adminService.registerProducts(body);
    res.status(201).json({
      message: "상품 등록이 완료되었습니다.",
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async editProducts(req, res, next) {
    const { productId } = req.params;
    /** @type {{productName: string; desc: string; price: number; image: string;}} */
    const body = req.body;
    await this.adminService.editProducts(Number(productId), body);
    res.status(201).json({
      message: "상품 정보가 변경되었습니다.",
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async deleteProducts(req, res, next) {
    const { productId } = req.params;
    await this.adminService.deleteProducts(Number(productId));
    res.status(200).json({
      message: "상품을 삭제하였습니다.",
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async getOrderProducts(req, res, next) {
    const orders = await this.adminService.getOrderProducts();
    res.status(200).json(orders);
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async putProductsStatus(req, res, next) {
    const { productId } = req.params;
    /** @type {{status: string}} */
    const { status } = req.body;
    await this.adminService.putProductsStatus(Number(productId), status);
    res.status(201).json({
      message: "상품 상태를 변경하였습니다.",
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async putUserGrade(req, res, next) {
    const { userId } = req.params;
    /** @type {{grade: number}} */
    const { grade } = req.body;
    await this.adminService.putUserGrade(Number(userId), grade);
    res.status(201).json({
      message: "등급이 변경되었습니다.",
    });
  }
}

module.exports = AdminController;
