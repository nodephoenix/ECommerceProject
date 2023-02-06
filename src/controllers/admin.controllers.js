"use strict";
const Joi = require("joi");
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
    try {
      const bodySchema = Joi.object({
        productName: Joi.string().required(),
        desc: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
      });
      /** @type {{productName: string; desc: string; price: number; image: string | null;}} */
      const body = req.body;
      body.image = req.file?.filename || null;
      const validate = await bodySchema.validateAsync(body).catch(() => false);
      if (!validate) {
        return res.status(400).json({
          message: "잘못된 요청입니다.",
        });
      }
      await this.adminService.registerProducts(body);
      return res.status(201).json({
        message: "상품 등록이 완료되었습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "알 수 없는 오류가 일어났습니다.",
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async editProducts(req, res, next) {
    const paramsSchema = Joi.object({
      productId: Joi.string().required(),
    });
    const bodySchema = Joi.object({
      productName: Joi.string().required(),
      desc: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
    });
    try {
      const { productId } = req.params;
      /** @type {{productName: string; desc: string; price: number; image: string;}} */
      const body = req.body;
      body.image = req.file?.filename;
      const paramValidate = await paramsSchema
        .validateAsync(req.params)
        .catch(() => false);
      const bodyValidate = await bodySchema
        .validateAsync(body)
        .catch(() => false);
      if (!paramValidate || !bodyValidate) {
        return res.status(400).json({
          message: "잘못된 요청입니다.",
        });
      }
      await this.adminService.editProducts(Number(productId), body);
      return res.status(201).json({
        message: "상품 정보가 변경되었습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "알 수 없는 오류가 일어났습니다.",
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async deleteProducts(req, res, next) {
    try {
      const paramsSchema = Joi.object({
        productId: Joi.string().required(),
      });

      const { productId } = req.params;
      const paramValidate = await paramsSchema
        .validateAsync(req.params)
        .catch(() => false);

      if (!paramValidate) {
        return res.status(400).json({
          message: "잘못된 요청입니다.",
        });
      }
      await this.adminService.deleteProducts(Number(productId));
      return res.status(200).json({
        message: "상품을 삭제하였습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "알 수 없는 오류가 일어났습니다.",
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async getOrderProducts(req, res, next) {
    try {
      const orders = await this.adminService.getOrderProducts();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({
        message: "알 수 없는 오류가 일어났습니다.",
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async putProductsStatus(req, res, next) {
    try {
      const paramsSchema = Joi.object({
        productId: Joi.string().required(),
      });
      const bodySchema = Joi.object({
        status: Joi.number().required(),
      });
      const { productId } = req.params;
      const paramValidate = await paramsSchema
        .validateAsync(req.params)
        .catch(() => false);
      const bodyValidate = await bodySchema
        .validateAsync(req.body)
        .catch(() => false);
      if (!paramValidate || !bodyValidate) {
        return res.status(400).json({
          message: "잘못된 요청입니다.",
        });
      }
      /** @type {{status: string}} */
      const { status } = req.body;
      await this.adminService.putProductsStatus(Number(productId), status);
      return res.status(201).json({
        message: "상품 상태를 변경하였습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "알 수 없는 오류가 일어났습니다.",
      });
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async putUserGrade(req, res, next) {
    try {
      const paramsSchema = Joi.object({
        userId: Joi.string().required(),
      });
      const bodySchema = Joi.object({
        grade: Joi.number().required(),
      });
      const { userId } = req.params;
      const paramValidate = await paramsSchema
        .validateAsync(req.params)
        .catch(() => false);
      const bodyValidate = await bodySchema
        .validateAsync(req.body)
        .catch(() => false);
      if (!paramValidate || !bodyValidate) {
        return res.status(400).json({
          message: "잘못된 요청입니다.",
        });
      }
      /** @type {{grade: number}} */
      const { grade } = req.body;
      await this.adminService.putUserGrade(Number(userId), grade);
      return res.status(201).json({
        message: "등급이 변경되었습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "알 수 없는 오류가 일어났습니다.",
      });
    }
  }
}

module.exports = AdminController;
