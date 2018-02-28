const sql = require("mssql");
const connStr = "aqui de estar a string de conexão com o banco";

var conexao = sql.connect(connStr, function(err){});
            // .then(conn => {conexao = conn; callback(undefined, conn);})
            // .catch(err => callback(err, undefined));

module.exports = conexao.request();
        

