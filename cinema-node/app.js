// External modules
var express = require('express');
const bodyParser = require('body-parser');
const {errors} = require('celebrate');
var cors = require('cors')

// Internal modules
var db = require('./connectors/mongoDB');
const routes = require('./routes');

// Init router
const router = express.Router();
router.all('*', cors());

require('dotenv').config();

var app = express();
var port = 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

db.connectMongo().then(() => {
    console.log(db.isConnected());
});

app.listen(port, "0.0.0.0", () => {
    console.log('We are live on ' + port);
});

app.use('/', routes(router));

app.use(errors());

module.exports = app;
