/**
 * Created by Jakub Matuška on 30.01.2017.
 */
"use strict";

const Items = require('../sql/items');

module.exports = (app, connection, authenticate) => {
  //CREATE

  app.post('/api/items/', [authenticate, function (req, res) {
    const id = req.body.id;
    const category = req.body.category;
    const name = req.body.name || "";
    const year = req.body.year || (new Date()).getFullYear();
    const description = req.body.description || "";
    const picture = req.body.picture || "";
    const pictureX = req.body.pictureX || 0;
    const pictureY = req.body.pictureY || 0;
    const link = req.body.link || "";

    Items.createItem(connection, id, category, name, year, description, picture, pictureX, pictureY, link).then(
      (value) => res.json(value),
      (err) => res.sendStatus(400)
    );
  }]);


  // READ

  app.get('/api/items', function (req, res) {
    Items.getItems(connection).then(
      (value) => res.json(value),
      (err) => res.sendStatus(500)
    );
  });

  app.get('/api/items/:id', function (req, res) {
    Items.getItem(connection, req.params.id).then(
      (value) => res.json(value),
      (err) => res.sendStatus(500)
    );
  });


  // UPDATE

  app.put('/api/items/:id', [authenticate, function (req, res) {
    const id = req.params.id;
    const category = req.body.category;
    const name = req.body.name || "";
    const year = req.body.year || (new Date()).getFullYear();
    const description = req.body.description || "";
    const picture = req.body.picture || "";
    const pictureX = req.body.pictureX || 0;
    const pictureY = req.body.pictureY || 0;
    const link = req.body.link || "";

    Items.setItem(connection, id, category, name, year, description, picture, pictureX, pictureY, link).then(
      (value) => res.json(value),
      (err) => res.sendStatus(400)
    );
  }]);


  // DELETE

  app.delete('/api/items/:id/', [authenticate, function (req, res) {
    const id = req.params.id;

    Items.deleteItem(connection, id).then(
      (value) => res.json(value),
      (err) => res.sendStatus(400)
    );
  }]);
};