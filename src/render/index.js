"use strict";

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (res.locals.user) {
        res.render('index.ejs', { login: true });
    }
    res.render('index.ejs', { login: false });
});


router.get('/mypage', (req, res) => {
    if (res.locals.user) {
        res.render('mypage.ejs', { login: true });
    }
    res.render('mypage.ejs', { login: false });
});

router.get('/productall', (req, res) => {
    if (res.locals.user) {
        res.render('productall.ejs', { login: true });
    }
    res.render('productall.ejs', { login: false });
});


router.get('/main', (req, res) => {
    if (res.locals.user) {
        res.render('main.ejs', { login: true });
    }
    res.render('main.ejs', { login: false });
});


module.exports = router