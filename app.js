//===================
// MAIN APP
//===================

//Initial configuration
//Using express framework
//and socket.io
var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//Set resources folder (css, js, etc..)
app.use(express.static('public'));

//Set views folder to current folder
app.set("views", ".");

//Set view engine to ejs (because jade is confusing)
app.set("view engine", "ejs");

//Set port to process port or fall back to 5000 (e.g. localhost)
var port = process.env.PORT || 5000;
server.listen(port);

//Root request
app.get("/", function(req,res){
  res.render("index");
});

//True business
io.sockets.on('connection', function (socket) {
  
  //On connection, send this to current client
  socket.emit('initmessage', 'Vous etes bien connecte!');
  //Send this to other connected clients
  socket.broadcast.emit('initmessage', 'Un autre client vient de se connecter !');

  //On reception of a message
  socket.on('message', function (message) {
    //Send to current client
    socket.emit('broadcast', message);
    //Broadcast it to other connected clients
    socket.broadcast.emit('broadcast', message);
  }); 
});
