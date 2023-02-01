"use strict";

const express = require('express');
const router = express.Router();
const Auth = require('./auth.routes')
const Users = require('./users.routes')
const Products = require('./products.routes')
const AdminProducts = require('./admin.routes')
const Carts = require('./carts.routes')
const Orders = require('./oders.routes')


router.use("/", [Auth, Users, Products, AdminProducts , Carts, Orders])

module.exports = router;