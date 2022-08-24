const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "f1",
    password: "Y62u47r92i1994@",
    multipleStatements: true
  });

  connection.connect(function(err){
    if (err) {
      return console.error("Error: " + err.message);
    }
    else{
      console.log("Database is connect");
    }
 });

 module.exports = connection;
