const mysql = require("mysql2/promise");
const dbconfig = require("./dbconfig.json");

const pool = mysql.createPool(dbconfig);

module.exports = pool;
