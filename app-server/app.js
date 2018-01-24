/**
 * Dependencias
 */
const express = require('express');  
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const router = require('./routes/server');


app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/services', router);

// Configurando o Servidor
app.set('port', process.env.PORT || 8080);

/**
 * configura nossa aplicação (app) Express para usar o body parser 
 * que carregamos da biblioteca body-parser, permitindo que recebamos 
 * mais tarde POSTs nos formatos URLEncoded e JSON
 */

//start server 
console.log("server running at localhost:8080");
app.listen(process.env.PORT || 8080);