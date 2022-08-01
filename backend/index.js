'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/gestarmory')
mongoose.connect('mongodb://database:27017/gestarmory') //docker

        .then(()=>{
            console.log("Conected to the DB");

            // Creación del servidor
            app.listen(port, ()=> {
                console.log("Server running on url: localhost:3700");
            });
        })
        .catch(err=>console.log(err));