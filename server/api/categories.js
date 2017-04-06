/**
 * Created by Jakub Matuška on 30.01.2017.
 */
"use strict";

const Categories = require('../sql/categories');

module.exports = (app, connection, authenticate) => {
  // CREATE

  app.post('/api/categories/', [authenticate, function (req, res) {
    const id = req.body.id;
    const color = req.body.color || "#000000";
    const name = req.body.name || "";

    Categories.createCategory(connection, id, color, name).then(
      (value) => res.json(value),
      (err) => res.sendStatus(400)
    );
  }]);


  // READ

  app.get('/api/categories', function (req, res) {
    Categories.getCategories(connection).then(
      (value) => res.json(value),
      (err) => res.sendStatus(500)
    );
  });

  app.get('/api/categories/:id', function (req, res) {
    Categories.getCategory(connection, req.params.id).then(
      (value) => res.json(value),
      (err) => res.sendStatus(500)
    );
  });


  // UPDATE

  app.put('/api/categories/:id', [authenticate, function (req, res) {
    const id = req.params.id;
    const color = req.body.color || "#000000";
    const name = req.body.name || "";

    Categories.setCategory(connection, id, color, name).then(
      (value) => res.json(value),
      (err) => res.sendStatus(400)
    );
  }]);


  // DELETE

  app.delete('/api/categories/:id/', [authenticate, function (req, res) {
    const id = req.params.id;

    Categories.deleteCategory(connection, id).then(
      (value) => res.json(value),
      (err) => res.sendStatus(400)
    );
  }]);
};