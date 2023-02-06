"use strict";

const express = require("express");
const router = express.Router();
const loginCheck = require("../middleware/logincheck");

router.get("/", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("index.ejs", { login: true });
  }
  res.render("index.ejs", { login: false });
});

router.get("/mypage", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("mypage.ejs", { login: true });
  }
  res.render("mypage.ejs", { login: false });
});

router.get("/productall", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("productall.ejs", { login: true });
  }
  res.render("productall.ejs", { login: false });
});

router.get("/product/detail", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("product.detail.ejs", { login: true });
  }
  res.render("product.detail.ejs", { login: false });
});

router.get("/carts", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("carts.ejs", { login: true });
  }
  res.render("carts.ejs", { login: false });
});

router.get("/login", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("login.ejs", { login: true });
  }
  res.render("login.ejs", { login: false });
});

router.get("/register", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("register.ejs", { login: true });
  }
  res.render("register.ejs", { login: false });
});

router.get("/admin/product/list", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("admin.all.product.ejs", { login: true });
  }
  res.render("admin.all.product.ejs", { login: false });
});

router.get("/admin/members/list", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("admin.member.list.ejs", { login: true });
  }
  res.render("admin.member.list.ejs", { login: false });
});

router.get("/admin/register/product", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("admin.product.fix.ejs", { login: true });
  }
  res.render("admin.product.fix.ejs", { login: false });
});

router.get("/admin/register/product", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("admin.product.fix.ejs", { login: true });
  }
  res.render("admin.product.fix.ejs", { login: false });
});

router.get("/order/detail", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("order.check.ejs", { login: true });
  }
  res.render("order.check.ejs", { login: false });
});

router.get("/order/success", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("order.success.ejs", { login: true });
  }
  res.render("order.success.ejs", { login: false });
});

router.get("/order/history", loginCheck, (req, res) => {
  if (res.locals.user) {
    return res.render("order.history.ejs", { login: true });
  }
  res.render("order.history.ejs", { login: false });
});

module.exports = router;
