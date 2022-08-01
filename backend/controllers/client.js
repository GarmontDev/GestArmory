'use strict'
const { deleteOne } = require('../models/client');
var Client = require('../models/client');

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

    saveClient: function(req, res){
        var client = new Client();
        
        var params = req.body;
        client.dni = params.dni;
        client.name = params.name;
        client.address = params.address;
        client.city = params.city;
        client.province = params.province;
        client.guide = params.guide;
        client.guideexpeditiondate = params.guideexpeditiondate;


        client.save((err, clientStored) =>{
            if (err) return res.status(500).send({message: 'Error trying to save the document.'});

            if (!clientStored) return res.status(404).send({message: 'The client couldnt be saved.'});

            return res.status(200).send({client: clientStored});
        });
    },

    getClient: function(req, res){
        var clientID = req.params.id;

        if (clientID == null) return res.status(404).send({message: 'The client does not exist.'});

        Client.findById(clientID, (err, client) =>{
            if (err) return res.status(500).send({message: 'Error trying to load the document.'});

            if (!client) return res.status(404).send({message: 'The client does not exist.'});

            return res.status(200).send({
                client
            });

        });
    },

    getClients: function(req, res){
        
        Client.find({}).exec((err, clients)=>{
            if (err) return res.status(500).send({message: 'Error trying to load the clients.'});

            if (!clients) return res.status(404).send({message: 'There are no clients available.'});

            return res.status(200).send({clients});

        });
    },

    updateClients: function(req,res){
        var clientID = req.params.id;
        var update = req.body;

        Client.findByIdAndUpdate(clientID, update, {new:true}, (err, clientUpdated) =>{
            if (err) return res.status(500).send({message: 'Error updating the client.'});

            if (!clientUpdated) return res.status(404).send({message: 'The client is not available to update.'});

            return res.status(200).send({
                client: clientUpdated
            });
        });
    },

    deleteClient: function(req,res){
        var clientID = req.params.id;
        Client.findByIdAndDelete(clientID, (err, clientRemoved)=>{
            if (err) return res.status(500).send({message: 'Error deleting the client.'});

            if (!clientRemoved) return res.status(404).send({message: 'The client is not available to delete.'});

            return res.status(200).send({
                client: clientRemoved
            });
        });
    },

    uploadImage: function(req, res){
        var clientID = req.params.id;
        var fileName = 'Image not uploaded';

        if (req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Client.findByIdAndUpdate(clientID, {image: fileName},{new: true}, (err, clientUpdated)=>{
                if (err) return res.status(500).send({message: 'The image could not be uploaded.'});

                if (!clientUpdated) return res.status(404).send({message: 'The client is not available.'});

                return res.status(200).send({
                    client: clientUpdated
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