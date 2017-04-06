/**
 * Created by Jakub Matuška on 30.01.2017.
 */
"use strict";

const runQuery = require('./runQuery');

module.exports = {
  getCategories: (connection) =>
    runQuery(connection, 'SELECT * FROM `categories`'),

  getCategory: (connection, id) =>
    runQuery(connection, 'SELECT * FROM `categories` WHERE `id` = ?', [id]),

  setCategory: (connection, id, color, name) => runQuery(connection,
    'UPDATE `categories` SET `color` = ?, `name` = ? WHERE `id` = ?',
    [color, name, id]
  ),

  createCategory: (connection, id, color, name) => runQuery(connection,
    'INSERT INTO `categories` (`id`, `color`, `name`) VALUES (?, ?, ?)',
    [id, color, name]
  ),

  deleteCategory: (connection, id) =>
    runQuery(connection, 'DELETE FROM `categories` WHERE `id` = ?', [id]),
};

