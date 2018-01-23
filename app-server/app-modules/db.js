const sql = require("mssql");
const connStr = "Server=ASSERTH-401\\SQLEXPRESS;Database=DB_BV_QC_06112017;User Id=sa;Password=123456;";

var conexao = sql.connect(connStr, function(err){});
            // .then(conn => {conexao = conn; callback(undefined, conn);})
            // .catch(err => callback(err, undefined));

module.exports = conexao.request();
        

