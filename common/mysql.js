const config = require("../config");
const sql = require("mysql");

var con = sql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = con;
