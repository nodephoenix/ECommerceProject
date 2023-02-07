"use strict";
// @ts-check

const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

const AdminController = require("../controllers/admin.controllers.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");
const adminController = new AdminController();

// admin 상품 등록 API
router.post(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  adminController.registerProducts
);

// admin 상품 수정 API
router.put(
  "/admin/products/:productId",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  adminController.editProducts
);

// admin 상품 삭제 API
router.delete(
  "/admin/products/:productId",
  authMiddleware,
  adminMiddleware,
  adminController.deleteProducts
);

// admin 주문 상품 목록 및 상태 조회 API
router.get(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  adminController.getOrderProducts
);

// admin 상품 상태 변경 API
router.put(
  "/admin/products/:productId/status",
  authMiddleware,
  adminMiddleware,
  adminController.putProductsStatus
);

// admin 회원 등급 변경(선택) API
router.put(
  "/admin/user/:userId/grade",
  authMiddleware,
  adminMiddleware,
  adminController.putUserGrade
);

module.exports = router;
