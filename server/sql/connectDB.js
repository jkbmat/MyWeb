/**
 * Created by Jakub Matuška on 29.01.2017.
 */
const mysql = require('mysql2');

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'myweb',
  password: 'heslo',
  database: 'myweb',
});