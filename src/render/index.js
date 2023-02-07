"use strict";

const express = require("express");
const router = express.Router();
const loginCheck = require("../middleware/logincheck");

router.get("/", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("main.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("main.ejs", { admin: false, login: true });
  }
  return res.render("main.ejs", { admin: false, login: false });
});

router.get("/mypage", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("mypage.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("mypage.ejs", { admin: false, login: true });
  }
  res.render("mypage.ejs", { admin: false, login: false });
});

router.get("/productall", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("productall.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("productall.ejs", { admin: false, login: true });
  }
  res.render("productall.ejs", { admin: false, login: false });
});

router.get("/product/detail", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("product.detail.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("product.detail.ejs", { admin: false, login: true });
  }
  res.render("product.detail.ejs", { admin: false, login: false });
});

router.get("/carts", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("carts.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("carts.ejs", { admin: false, login: true });
  }
  res.render("carts.ejs", { admin: false, login: false });
});

router.get("/login", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.redirect("/");
  } else if (res.locals.user === 0) {
    return res.redirect("/");
  }
  res.render("login.ejs");
});

router.get("/register", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("register.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("register.ejs", { admin: false, login: true });
  }
  res.render("register.ejs", { admin: false, login: false });
});

router.get("/admin/product/list", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("admin.all.product.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("admin.all.product.ejs", { admin: false, login: true });
  }
  res.render("admin.all.product.ejs", { admin: false, login: false });
});

router.get("/admin/members/list", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("admin.member.list.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("admin.member.list.ejs", { admin: false, login: true });
  }
  res.render("admin.member.list.ejs", { admin: false, login: false });
});

router.get("/admin/product/fix", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("admin.product.fix.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("admin.product.fix.ejs", { admin: false, login: true });
  }
  res.render("admin.product.fix.ejs", { admin: false, login: false });
});

router.get("/admin/product/register", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("admin.product.regist.ejs", {
      admin: true,
      login: false,
    });
  } else if (res.locals.user === 0) {
    return res.render("admin.product.regist.ejs", {
      admin: false,
      login: true,
    });
  }
  res.render("admin.product.regist.ejs", { admin: false, login: false });
});

router.get("/order/detail", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("order.check.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("order.check.ejs", { admin: false, login: true });
  }
  res.render("order.check.ejs", { admin: false, login: false });
});

router.get("/order/success", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("order.success.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("order.success.ejs", { admin: false, login: true });
  }
  res.render("order.success.ejs", { admin: false, login: false });
});

router.get("/order/history", loginCheck, (req, res) => {
  if (res.locals.user === 1) {
    return res.render("order.history.ejs", { admin: true, login: false });
  } else if (res.locals.user === 0) {
    return res.render("order.history.ejs", { admin: false, login: true });
  }
  res.render("order.history.ejs", { admin: false, login: false });
});

module.exports = router;
