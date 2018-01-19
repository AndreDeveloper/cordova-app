const sql = require("mssql");
const connStr = "Server=ASSERTH-401\\SQLEXPRESS;Database=BASE_TESTE;User Id=sa;Password=123456;";

var exports = module.exports = {};

function conectar(callback){
    sql.connect(connStr)
        .then(conn => callback(undefined, conn))
        .catch(err => callback(err, undefined));
}

exports.execute = function (query, callback){
    conectar(function(err, conn){
        conn.request()
                .query(query)
                .then(result => {
                    callback(undefined, result)
                })
                .catch(err => {
                    callback(err, undefined)
                }); 
        });
}
