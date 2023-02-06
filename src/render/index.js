"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (res.locals.user) {
    res.render("index.ejs", { login: true });
  }
  res.render("index.ejs", { login: false });
});

router.get("/mypage", (req, res) => {
  if (res.locals.user) {
    res.render("mypage.ejs", { login: true });
  }
  res.render("mypage.ejs", { login: false });
});

router.get("/productall", (req, res) => {
  if (res.locals.user) {
    res.render("productall.ejs", { login: true });
  }
  res.render("productall.ejs", { login: false });
});

router.get("/product/detail", (req, res) => {
  if (res.locals.user) {
    res.render("product.detail.ejs", { login: true });
  }
  res.render("product.detail.ejs", { login: false });
});

router.get("/main", (req, res) => {
  if (res.locals.user) {
    res.render("main.ejs", { login: true });
  }
  res.render("main.ejs", { login: false });
});

router.get("/carts", (req, res) => {
  if (res.locals.user) {
    res.render("carts.ejs", { login: true });
  }
  res.render("carts.ejs", { login: false });
});

router.get("/login", (req, res) => {
  if (res.locals.user) {
    res.render("login.ejs", { login: true });
  }
  res.render("login.ejs", { login: false });
});

router.get("/register", (req, res) => {
  if (res.locals.user) {
    res.render("register.ejs", { login: true });
  }
  res.render("register.ejs", { login: false });
});

router.get("/admin/product/list", (req, res) => {
  if (res.locals.user) {
    res.render("admin.all.product.ejs", { login: true });
  }
  res.render("admin.all.product.ejs", { login: false });
});

router.get("/admin/members/list", (req, res) => {
  if (res.locals.user) {
    res.render("admin.member.list.ejs", { login: true });
  }
  res.render("admin.member.list.ejs", { login: false });
});

router.get("/admin/register/product", (req, res) => {
  if (res.locals.user) {
    res.render("admin.product.fix.ejs", { login: true });
  }
  res.render("admin.product.fix.ejs", { login: false });
});

router.get("/admin/register/product", (req, res) => {
  if (res.locals.user) {
    res.render("admin.product.fix.ejs", { login: true });
  }
  res.render("admin.product.fix.ejs", { login: false });
});

router.get("/order/detail", (req, res) => {
  if (res.locals.user) {
    res.render("order.check.ejs", { login: true });
  }
  res.render("order.check.ejs", { login: false });
});

router.get("/order/success", (req, res) => {
  if (res.locals.user) {
    res.render("order.success.ejs", { login: true });
  }
  res.render("order.success.ejs", { login: false });
});

module.exports = router;
