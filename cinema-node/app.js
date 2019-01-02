// External modules
var express = require('express');
const bodyParser = require('body-parser');

// Internal modules
var db = require('./connectors/mongoDB');
const routes = require('./routes');

// Init router
const router = express.Router();

require('dotenv').config();

var app = express();
var port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.connectMongo().then( () => {
  console.log(db.isConnected());
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});

app.use('/', routes(router));

module.exports = app;
