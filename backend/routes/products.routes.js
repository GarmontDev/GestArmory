'use strict'

var express = require('express');

var ProductController = require('../controllers/product.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProductController.home);
router.post('/test', ProductController.test);

router.post('/save-product', ProductController.saveProduct);
router.get('/product/:id?', ProductController.getProduct);
router.get('/products', ProductController.getProducts);
router.put('/product/:id?', ProductController.updateProducts);
router.delete('/product/:id?', ProductController.deleteProduct);

router.post('/upload-image/:id?', multipartMiddleware,ProductController.uploadImage);


module.exports = router;