'use strict'

var express = require('express');

var MovementController = require('../controllers/movement');

var router = express.Router();

router.post('/save-movement', MovementController.saveMovement);
router.get('/movement/:id?', MovementController.getMovement);
router.get('/movements', MovementController.getMovements);
router.put('/movement/:id?', MovementController.updateMovements);
router.delete('/movement/:id?', MovementController.deleteMovement);


module.exports = router;