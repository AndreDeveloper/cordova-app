const express = require('express');  
const bodyParser = require('body-parser');
const db = require("../app-modules/db");

module.exports = (function() {
    'use strict';
    var app = express.Router();

    app.get('/', function(req, res) {
        res.send('hello world');
    });

    app.get('/lista/:id?', function(req, res){        
        var id = req.params.id;
        
        var filter = "";
        if(id) filter =  `where nome like '%${id}%'`
        var query = `select * from itens ${filter}`    
        
        db.execute(query, function(err, result){
            res.status(200);
            res.send(result.recordset);            
        });
    });

    return app;
})();