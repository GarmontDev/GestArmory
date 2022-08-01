'use strict'

var express = require('express');

var LoginController = require('../controllers/login');

var router = express.Router();

router.post('/login', LoginController.login);
router.post('/signup', LoginController.newUser);
router.get('/login', LoginController.getUser);

module.exports = router;