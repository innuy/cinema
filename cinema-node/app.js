// External modules
var express = require('express');
var app = express();
var port = 8000;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');

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

var path = require('path');
const sendDataToDashboardNamespace = require("./websockets/dashboard").sendDataToDashboardNamespace;
const sendTicketListToSocketStartingReservation = require("./websockets/ticketReservation").startingTicketReservation;

app.get('/dashboardDemo', function(req, res) {
    res.sendFile(path.join(__dirname + '/dashboardDemo.html'));
});
app.get('/reservingTicketsDemo', function(req, res) {
    res.sendFile(path.join(__dirname + '/reservingTicketsDemo.html'));
});

app.use('/', routes(router));
app.use('*', function(req, res){
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "The page you ask for doesnt exist"
    });
});

var dashboardNamespace = io.of('/dashboard');
dashboardNamespace.on('connection', function(socket){
    sendDataToDashboardNamespace();

    console.log('a user join dashboard');
});

var reservingTicketsNamespace = io.of('/reservingTickets');
reservingTicketsNamespace.on('connection', function(socket){

    console.log('a user join reservingTickets');
    socket.on('startReservation', function (presentationId) {
        sendTicketListToSocketStartingReservation(presentationId, socket);

        socket.join('presentation-' + presentationId);
        console.log('a user starts reservation of: ' + presentationId);
    });
});

http.listen(8000, "0.0.0.0", function(){
    console.log('We are live on ' + port);
});

app.use(errors());

module.exports.app = app;
module.exports.io = io;
module.exports.dashboardNamespace = dashboardNamespace;
module.exports.reservingTicketsNamespace = reservingTicketsNamespace;
