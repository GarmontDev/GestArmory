'use strict'
const { deleteOne } = require('../models/movement.model');
var Movement = require('../models/movement.model');

//Products

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Im the home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Im method or action test from the controller movement'
        });
    },

    saveMovement: function(req, res){
        var movement = new Movement();

        var params = req.body;
        movement.seatNumber = params.seatNumber;
        movement.date = params.date;
        movement.product = params.product;
        movement.guide = params.guide;
        movement.client = params.client;
        movement.stock = params.stock;


        movement.save((err, movementStored) =>{
            if (err) return res.status(500).send({message: 'Error trying to save the movement.'});

            if (!movementStored) return res.status(404).send({message: 'The movement couldnt be saved.'});

            return res.status(200).send({movement: movementStored});
        });
    },

    getMovement: function(req, res){
        var movementID = req.params.id;

        if (movementID == null) return res.status(404).send({message: 'The movement does not exist.'});

        Movement.findById(movementID, (err, movement) =>{
            if (err) return res.status(500).send({message: 'Error trying to load the movement.'});

            if (!movement) return res.status(404).send({message: 'The movement does not exist.'});

            return res.status(200).send({
                movement
            });

        });
    },

    getMovements: function(req, res){
        
        Movement.find({}).exec((err, movements)=>{
            if (err) return res.status(500).send({message: 'Error trying to load the movement.'});

            if (!movements) return res.status(404).send({message: 'There are no movements available.'});

            return res.status(200).send({
                movements
            });

        });
    },

    updateMovements: function(req,res){
        var movementID = req.params.id;
        var update = req.body;

        Movement.findByIdAndUpdate(movementID, update, {new:true}, (err, movementUpdated) =>{
            if (err) return res.status(500).send({message: 'Error updating the movement.'});

            if (!movementUpdated) return res.status(404).send({message: 'The movement is not available to update.'});

            return res.status(200).send({
                movement: movementUpdated
            });
        });
    },

    deleteMovement: function(req,res){
        var movementID = req.params.id;
        Movement.findByIdAndDelete(movementID, (err, movementRemoved)=>{
            if (err) return res.status(500).send({message: 'Error deleting the movement.'});

            if (!movementRemoved) return res.status(404).send({message: 'The movement is not available to delete.'});

            return res.status(200).send({
                movement: movementRemoved
            });
        });
    },

    uploadImage: function(req, res){
        var movementID = req.params.id;
        var fileName = 'Image not uploaded';

        if (req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Movement.findByIdAndUpdate(movementID, {image: fileName},{new: true}, (err, movementUpdated)=>{
                if (err) return res.status(500).send({message: 'The image could not be uploaded.'});

                if (!movementUpdated) return res.status(404).send({message: 'The movement is not available.'});

                return res.status(200).send({
                    movement: movementUpdated
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