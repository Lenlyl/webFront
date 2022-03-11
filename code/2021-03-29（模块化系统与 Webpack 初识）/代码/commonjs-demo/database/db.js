const mysql = require('./mysql');
const mssql = require('./mssql');

module.exports.query = function () {
    mysql();
    mssql();
}