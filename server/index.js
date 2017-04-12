/**
 * Created by Jakub Matuška on 29.01.2017.
 */
"use strict";

const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const hasher = require('password-hash-and-salt');

const app = express();
app.disable('x-powered-by');
const connection = require('./sql/connectDB');

const runQuery = require('./sql/runQuery');

global.DIST_DIR = path.resolve(__dirname + '/../dist/');


app.use(function (req, res, next) {
  res.set('X-Clacks-Overhead', 'GNU Terry Pratchet');
  next();
});

app.use(express.static(DIST_DIR));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./api/items')(app, connection, authenticate);
require('./api/categories')(app, connection, authenticate);

app.all('/api/*', function (req, res) {
  res.sendStatus(400);
});


app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const token = uuid();

  hasher(password).hash((err, hash) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    (async () => {
      try {
        await runQuery(connection, 'UPDATE `users` SET `token` = NULL WHERE `last_login` < DATE_SUB(NOW(), INTERVAL 30 DAY)', []);

        let response = await runQuery(connection, 'SELECT `hash` FROM `users` WHERE `username` = ?', [username]);

        if (response.length === 0) {
          console.log("Bad username: " + username);
          return res.sendStatus(400);
        }

        hasher(password).verifyAgainst(response[0].hash, async (error, verified) => {
          if (error) {
            console.log(error);
            return res.sendStatus(500);
          }

          if (!verified) {
            console.log("Bad login: ", username, password);
            return res.sendStatus(400);
          }

          await runQuery(connection, 'UPDATE `users` SET `last_login` = NOW(), `token` = ? WHERE `username` = ?', [token, username]);
          res.json({ username, token });
        });
      }
      catch (e) {
        console.log("Something went wrong while logging in.");
        return res.sendStatus(500);
      }
    })();
  });
});


app.get('*', function (req, res) {
  fs.readFile(DIST_DIR + '/html/index.html', 'utf8', (err, data) => {
    if (err)
      console.log(err);

    require('./defaultState')(connection).then(
      (defaultState) => res.send(data.replace("{/*DEFAULT_STATE*/}", JSON.stringify(defaultState))),
      (error) => {
        console.log(error);
        res.send('{/*error*/}');
      }
    )
  });
});


let server = app.listen(8081, function () {
  console.log("The server is running!");
});

function authenticate(req, res, next) {
  const auth = req.get('Authorization');
  const regex = /^Token (.*)$/.exec(auth);

  if (regex === null)
    return fail();

  const token = regex[1];

  runQuery(connection, 'SELECT `id` FROM `users` WHERE `token` = ?', [token]).then(
    (value) => value.length ? next() : fail(),
    (error) => fail()
  );

  function fail() {
    return res.sendStatus(401);
  }
}
