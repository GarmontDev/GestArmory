'use strict'
const { json } = require('body-parser');
var User = require('../models/user');

var controller = {
    login: function(req,res){
        var _user = { email: req.body.email };
       User.findOne(_user, function(err, userFound){
            if (err) return res.status(500).send({message: 'Error finding the client.'});

            if (!userFound) return res.status(404).send({
                message: 'The user is not available. '+'Email sent: '+_user
            });

            // console.log(userFound);

            return res.status(200).send({
                user: userFound
            });
        })
    },

    getUser: function(req,res){
        var _user = { email: req.body.email };
        User.findOne(_user, function(err, userFound){

            //console.log(userFound);
            
            if (err) return res.status(500).send({message: 'Error finding the client.'});

            if (!userFound) return res.status(404).send({
                message: 'The user is not available.'
            });

            return res.status(200).send({
                user: userFound
            });
        })
    },

    newUser: function(req, res){
        var user = new User();

        var params = req.body;
        user.email = params.email;
        user.password = params.password;
        user.role = params.role;

        user.save((err, userStored) =>{
            if (err) return res.status(500).send({message: 'Error trying to save the user.'});

            if (!userStored) return res.status(404).send({message: 'The user couldnt be saved.'});

            return res.status(200).send({
                user: userStored
            });
        });
    },

}

module.exports = controller;