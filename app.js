var express = require("express");
var logger = require("logger");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var url = require("url");
var fs = require('fs');
var bodyParser = require('body-parser');
var expressjson = require('express-json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set("views", ".");
app.set("view engine", "ejs");
io.set("transports", ["xhr-polling"]);
io.set("polling duration", 10);

var msgs = [];
// Chargement du fichier index.html affiché au client

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
server.listen(port);

// Quand on client se connecte, on le note dans la console
app.get("/", function(req,res){
  res.render("index");
});

io.sockets.on('connection', function (socket) {
  socket.emit('initmessage', 'Vous etes bien connecte!');
  socket.broadcast.emit('initmessage', 'Un autre client vient de se connecter !');
  socket.on('message', function (message) {
    console.log('Un client me parle ! Il me dit : ' + message);
    socket.broadcast.emit('broadcast', message);
    socket.emit('broadcast', message);
  }); 
});
