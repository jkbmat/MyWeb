/**
 * Created by Jakub Matuška on 30.01.2017.
 */
"use strict";

module.exports = function runQuery (connection, query, params) {
  return new Promise((resolve, reject) => {
    connection.execute(query, params, function (err, rows, fields) {
      if(err) {
        console.log(err, query, params);
        reject(err);
      }

      resolve(rows);
    });
  });
};