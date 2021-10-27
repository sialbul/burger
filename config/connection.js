var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        database: "burgers_db",
        host: "localhost",
        port: 3306,
        user: "root",
    password: process.env.REACT_APP_PASS,
    });
}

connection.connect();
module.exports = connection;
