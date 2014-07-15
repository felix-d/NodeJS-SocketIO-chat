var express = require("express");

var app = express();
var port = Number(process.env.PORT || 5000);
var url = require("url");
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var expressjson = require('express-json');
app.set("views", ".");
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var msgs = [];
// Chargement du fichier index.html affiché au client

// Chargement de socket.io
var io = require('socket.io').listen(app.listen(port));

// Quand on client se connecte, on le note dans la console
app.get("/", function(req,res){
  res.render("index");
});
//
io.sockets.on('connection', function (socket) {
  socket.emit('initmessage', 'Vous etes bien connecte!');
  socket.broadcast.emit('initmessage', 'Un autre client vient de se connecter !');
  socket.on('message', function (message) {
    console.log('Un client me parle ! Il me dit : ' + message);
    socket.broadcast.emit('broadcast', message);
    socket.emit('broadcast', message);
  }); 
});
