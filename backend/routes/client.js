'use strict'

var express = require('express');

var ClientController = require('../controllers/client');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ClientController.home);
router.post('/test', ClientController.test);

router.post('/save-client', ClientController.saveClient);
router.get('/client/:id?', ClientController.getClient);
router.get('/clients', ClientController.getClients);
router.put('/client/:id?', ClientController.updateClients);
router.delete('/client/:id?', ClientController.deleteClient);

router.post('/upload-image/:id?', multipartMiddleware,ClientController.uploadImage);


module.exports = router;