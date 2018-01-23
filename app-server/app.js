/**
 * Dependencias
 */
const express = require('express');  
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./routes/server');

app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// Configurando o Servidor
app.set('port', process.env.PORT || 8080);

/**
 * configura nossa aplicação (app) Express para usar o body parser 
 * que carregamos da biblioteca body-parser, permitindo que recebamos 
 * mais tarde POSTs nos formatos URLEncoded e JSON
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/services', router);

//start server 
console.log("server running at localhost:8080");
app.listen(process.env.PORT || 8080);