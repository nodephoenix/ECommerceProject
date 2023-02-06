"use strict";

const express = require('express');
const router = express.Router();
const Auth = require('./auth.routes')
const Users = require('./users.routes')
const Products = require('./products.routes')
const AdminProducts = require('./admin.routes')
const Carts = require('./carts.routes')
const Orders = require('./orders.routes')


router.get("/", (req, res) => {
    res.render("views/index")
});

router.get("/", (req, res) => {
    res.render("views/mypage")
});

router.get("/", (req, res) => {
    res.render("views/productall")
});


router.use("/", [Auth, Users, Products, AdminProducts , Carts, Orders])

module.exports = router;
