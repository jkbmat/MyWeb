/**
 * Created by Jakub Matuška on 30.01.2017.
 */
"use strict";

const runQuery = require('./runQuery');

module.exports = {
  getItems: (connection) =>
    runQuery(connection, 'SELECT * FROM `items`'),

  getItem: (connection, id) =>
    runQuery(connection, 'SELECT * FROM `items` WHERE `id` = ?', [id]),

  setItem: (connection, id, category, name, year, description, picture, pictureX, pictureY, link) => runQuery(connection,
      'UPDATE `items` SET `category` = ?, `name` = ?, `year` = ?, `description` = ?, `picture` = ?, `pictureX` = ?, `pictureY` = ?, `link` = ? WHERE `id` = ?',
      [category, name, year, description, picture, pictureX, pictureY, link, id]
    ),

  createItem: (connection, id, category, name, year, description, picture, pictureX, pictureY, link) => runQuery(connection,
      'INSERT INTO `items` (`id`, `category`, `name`, `year`, `description`, `picture`, `pictureX`, `pictureY`, `link`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, category, name, year, description, picture, pictureX, pictureY, link]
    ),

  deleteItem: (connection, id) =>
    runQuery(connection, 'DELETE FROM `items` WHERE `id` = ?', [id]),
};

