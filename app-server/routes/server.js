const express = require('express');  
const db = require("../app-modules/db");
const router = express.Router();  
const pastaAnexo = "c:/tmp/node";

router.all("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

router.get('/part_bin/:q', function(req, res){        
    var filtro = req.params.q;
                                    
    var query = `select * from part_bin where part_code like '%${filtro}%'`    
    
    db.query(query, function(err, result){
        res.status(200);
        res.send(result.recordset);            
    });
});

router.get('/rev/:q', function(req, res){        
    var filtro = req.params.q;
                                    
    var query = `select * from revinspecao where numerodoc like '%${filtro}%'`    
    
    db.query(query, function(err, result){
        res.status(200);
        res.send(result.recordset);            
    });
});    

router.post('/rev/pesquisa', function(req, res){        
    var params = req.body;        
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
    db.query(query, function(err, result){
        res.status(200);
        res.send(result.recordset);            
    });
});

router.get('/rev-motivo', function(req, res){                     
    var query = `select * from revmotivo`;
        
    db.query(query, function(err, result){        
        res.status(200);
        res.send(result.recordset);            
    });
});

router.get('/rev-responsavel', function(req, res){        
    var query = `select * from revresponsavel`;
    
    db.query(query, function(err, result){
        res.status(200);
        res.send(result.recordset);            
    });
});

router.post('/rev', function(req, res){        
    var body = req.body;
    var query = ``;
    //verifica se existe registro no banco
    db.query(`SELECT * FROM REVINSPECAO WHERE NumeroDOC = '${body.noDoc}'`, function(err, result){
        if(result.recordset.length <= 0){
            // recupero id idNumberDoc
            db.query(`SELECT * from PART_BIN WHERE PART_CODE = '${body.partNumber}'`, function(err, result){
                            
            query = `INSERT INTO REVINSPECAO(
                NumeroDoc, 
                Item, 
                DataEmissao, 
                AreaSolicitante, 
                NomeSolicitante, 
                Responsavel_ID, 
                QA, 
                Motivo_ID, 
                NotaFiscal, 
                Part_Number_DOC_ID, 
                Quantidade,
                Anexo
            )VALUES(
                  '${body.noDoc}',
                  '${body.item}',
                  '${body.dataEmissao}',
                  '${body.areaSolicitante}',
                  '${body.nomeSolicitante}',
                  '${body.responsavel}',
                  '${body.qa}',
                  ${body.motivo},
                  '${body.notaFiscal}',
                  '${result.recordset[0].ID}',
                  ${body.quantidade},
                  '${pastaAnexo}/${body.anexo}'
                )`;
                db.query(query, function(err, result){
                    res.status(200);
                    res.send(result);            
                });
            });
        }else{
            query = ``;
        }         
    });        
});

router.post('/rev-anexo/upload', function(req, res) {
    if (!req.files)
      return res.status(400).send('Nenhum arquivo selecionado');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.anexo;
   
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(pastaAnexo, function(err) {
      if (err)
        return res.status(500).send(err);
        
      return res.status(200).send("File uploaded!");      
    });
  });
  
module.exports = router;