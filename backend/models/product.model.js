'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    id: String,
    name: String,
    stock: Number
});


module.exports = mongoose.model('product',ProductSchema);