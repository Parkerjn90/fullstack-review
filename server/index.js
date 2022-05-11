const { color, modifier, log } = require('console-log-colors');
const { red, green, yellow, blue, magenta, cyan, bold, italic, underline } = color;

const express = require('express');
let app = express();

const { save, getAll } = require('../database/index.js');
const { getReposByUsername } = ('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  getReposByUsername(req.body.username)
    .then((repoList) => {
      save(repoList.data)
    }).then(() => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(404);
    });
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getAll()
    .then((repoData) => {
      res.send(repoData);
    })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

