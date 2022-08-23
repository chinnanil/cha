
// const mysql = require("mysql");

// const db = mysql.createConnection({

//     host: "localhost",
//     user: "root",
//     password: "Admin@123",
//     database: "chachapoyav3",
//     port: "3306",
//     multipleStatements: true,
//     // multiLevelStatements: true
// });

// module.exports = db;



const mysql = require("mysql");


const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Admin@2315",
    database: "chachapoya",
    port: "3306",
    multipleStatements: true,
    // multiLevelStatements: true
});

module.exports = db;


