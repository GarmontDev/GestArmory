'use strict'
const { deleteOne } = require('../models/product.model');
var Product = require('../models/product.model')

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Im the home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Im method or action test from the controller client'
        });
    },

    saveProduct: function(req, res){
        var product = new Product();

        var params = req.body;
        product.id = params.id;
        product.name = params.name;
        product.stock = params.stock;

        product.save((err, productStored) =>{
            
            if (err) return res.status(500).send({message: 'Error trying to save the document.'});

            if (!productStored) return res.status(404).send({message: 'The product couldnt be saved.'});

            return res.status(200).send({product: productStored});
        });
    },

    getProduct: function(req, res){
        var productID = req.params.id;

        if (productID == null) return res.status(404).send({message: 'The client does not exist.'});

        Product.findById(productID, (err, product) =>{
            if (err) return res.status(500).send({message: 'Error trying to load the document.'});

            if (!product) return res.status(404).send({message: 'The product does not exist.'});

            return res.status(200).send({
                product
            });

        });
    },

    getProducts: function(req, res){
        
        Product.find({}).exec((err, products)=>{
            if (err) return res.status(500).send({message: 'Error trying to load the products.'});

            if (!products) return res.status(404).send({message: 'There are no products available.'});

            return res.status(200).send({products});

        });
    },

    updateProducts: function(req,res){
        var productID = req.params.id;
        var update = req.body;

        Product.findByIdAndUpdate(productID, update, {new:true}, (err, productUpdated) =>{
            if (err) return res.status(500).send({message: 'Error updating the product.'});

            if (!productUpdated) return res.status(404).send({message: 'The product is not available to update.'});

            return res.status(200).send({
                product: productUpdated
            });
        });
    },

    deleteProduct: function(req,res){
        var productID = req.params.id;
        Product.findByIdAndDelete(productID, (err, productRemoved)=>{
            if (err) return res.status(500).send({message: 'Error deleting the product.'});

            if (!productRemoved) return res.status(404).send({message: 'The product is not available to delete.'});

            return res.status(200).send({
                product: productRemoved
            });
        });
    },

    uploadImage: function(req, res){
        var productID = req.params.id;
        var fileName = 'Image not uploaded';

        if (req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Product.findByIdAndUpdate(productID, {image: fileName},{new: true}, (err, productUpdated)=>{
                if (err) return res.status(500).send({message: 'The image could not be uploaded.'});

                if (!productUpdated) return res.status(404).send({message: 'The product is not available.'});

                return res.status(200).send({
                    product: productUpdated
                });
            });


        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    }
};

module.exports = controller;