// External modules
var express = require('express');
var app = express();
var port = 8000;

require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const {errors} = require('celebrate');
var cors = require('cors');

// Internal modules
var db = require('./connectors/mongoDB');

db.connectMongo().then(() => {
    console.log(db.isConnected());
});

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Models & routes
require('./db/models/users');
require('./config/passport');

// Init router
const routes = require('./routes');
const router = express.Router();
router.all('*', cors());


const errorHandler = require('errorhandler');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if(!isProduction) {
    app.use(errorHandler());
}

app.use(logger('dev'));

app.use('/', routes(router));

app.use('*', function(req, res){
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "The page you ask for doesnt exist"
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log('We are live on ' + port);
});

app.use(errors());

module.exports = app;
