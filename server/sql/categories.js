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

  setCategory: (connection, id, color, name, autoOpen, defaultChecked) => runQuery(connection,
    'UPDATE `categories` SET `color` = ?, `name` = ?, `autoOpen` = ?, defaultChecked = ? WHERE `id` = ?',
    [color, name, autoOpen, defaultChecked, id]
  ),

  createCategory: (connection, id, color, name, autoOpen, defaultChecked) => runQuery(connection,
    'INSERT INTO `categories` (`id`, `color`, `name`, `autoOpen`, `defaultChecked`) VALUES (?, ?, ?, ?, ?)',
    [color, name, autoOpen, defaultChecked, id]
  ),

  deleteCategory: (connection, id) =>
    runQuery(connection, 'DELETE FROM `categories` WHERE `id` = ?', [id]),
};

