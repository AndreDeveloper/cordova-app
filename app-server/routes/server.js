const express = require('express');  
const bodyParser = require('body-parser');
const db = require("../app-modules/db");

function routes(){
    'use strict';
    var app = express.Router();    
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    app.get('/part_bin/:q', function(req, res){        
        var filtro = req.params.q;
                                        
        var query = `select * from part_bin where part_code like '%${filtro}%'`    
        
        db.query(query, function(err, result){
            res.status(200);
            res.send(result.recordset);            
        });
    });

    app.get('/rev/:q', function(req, res){        
        var filtro = req.params.q;
                                        
        var query = `select * from revinspecao where numerodoc like '%${filtro}%'`    
        
        db.query(query, function(err, result){
            res.status(200);
            res.send(result.recordset);            
        });
    });

    app.post('/rev/pesquisa', function(req, res){        
        var params = req.body;
        console.log(params);
        console.log(req);
        var query = `select 
                        REV.NumeroDoc,
                        STATUS.Descricao as descricaoStatus,
                        REV.Item,
                        PB.PART_CODE as partCodeDocDescricao,
                        PB.DESCRICAO as partNumberDocDescricao,
                        REV.Quantidade,
                        M.Descricao as motivoDescricao,
                        REV.AreaSolicitante
                            
                    from REVINSPECAO REV
                    inner join REVSTATUS STATUS on REV.Status_ID = STATUS.Id
                    inner join PART_BIN PB on REV.Part_Number_DOC_ID = PB.ID
                    inner join REVMOTIVO M ON REV.Motivo_ID = M.Id
                    Where
                        (REV.NumeroDoc like '%${params.NumeroDoc}%' Or '${params.NumeroDoc}' = '')
                        AND (STATUS.Descricao = '${params.status}' Or '${params.status}' = '')
                        AND (PB.PART_CODE like '%${params.partCode}%' Or '${params.partCode}' = '');`    
        console.log(query);
        db.query(query, function(err, result){
            res.status(200);
            res.send(result.recordset);            
        });
    });

    return app;
}

module.exports = routes();