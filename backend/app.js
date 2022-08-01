'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


// Cargar archivos rutas
var client_routes = require('./routes/client');
var movement_routes = require('./routes/movement');
var user_routes = require('./routes/user.routes');
var product_routes = require('./routes/products.routes');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas

app.use('/api', client_routes);
app.use('/api', movement_routes);
app.use('/api', user_routes);
app.use('/api', product_routes);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.listen(process.env.PORT || 8080);

// exportar
module.exports = app;