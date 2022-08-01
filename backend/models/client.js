'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    dni: String,
    name: String,
    address: String,
    city: String,
    province: String,
    guide: String,
    guideexpeditiondate: Date
});



module.exports = mongoose.model('client',ClientSchema);