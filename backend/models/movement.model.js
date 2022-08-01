'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovementsSchema = Schema({
    seatNumber: String,
    date: Date,
    product: String,
    guide: String,
    client: String,
    auxBookPage: String,
    stock: Number
});

module.exports = mongoose.model('movement', MovementsSchema);