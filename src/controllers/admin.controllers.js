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

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  registerProducts = wrapAsync(async (req, res, next) => {
    /** @type {{productName: string; desc: string; price: number; image: string;}} */
    const body = req.body;
    await this.adminService.registerProducts(body);
    res.json({
      message: "상품 등록이 완료되었습니다.",
    });
  });

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  editProducts = wrapAsync(async (req, res, next) => {
    const { productId } = req.params;
    /** @type {{productName: string; desc: string; price: number; image: string;}} */
    const body = req.body;
    await this.adminService.editProducts(Number(productId), body);
    res.json({
      message: "상품 정보가 변경되었습니다",
    });
  });

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  deleteProducts = wrapAsync(async (req, res, next) => {
    const { productId } = req.params;
    await this.adminService.deleteProducts(Number(productId));
    res.json({
      message: "상품을 삭제하였습니다.",
    });
  });

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  getOrderProducts = wrapAsync(async (req, res, next) => {
    const orders = await this.adminService.getOrderProducts();
    res.json(orders);
  });

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  putProductsStatus = wrapAsync(async (req, res, next) => {
    const { productId } = req.params;
    /** @type {{status: string}} */
    const { status } = req.body;
    await this.adminService.putProductsStatus(Number(productId), status);
    res.json({
      message: "상품 상태를 변경하였습니다.",
    });
  });

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  putUserGrade = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;
    /** @type {{grade: number}} */
    const { grade } = req.body;
    await this.adminService.putUserGrade(Number(userId), grade);
    res.json({
      message: "등급이 변경되었습니다.",
    });
  });
}

module.exports = AdminController;
