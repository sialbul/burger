// Set up MySQL connection.

var mysql = require("mysql");
var connection;
​
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Efemir.2010",
    database: "burgers_db"
  });
}
​
connection.connect();
module.exports = connection;

