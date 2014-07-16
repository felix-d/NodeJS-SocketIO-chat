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
var mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_app27455666:4v7f8fna0ovu0v8mpl7echvd0k@ds061208.mongolab.com:61208/heroku_app27455666', 
                 function(err){
                   if(err) console.log(err); 
                   else console.log('success');});

//Create schema
var chatSchema = mongoose.Schema({
  msg: String,
  created: {type: Date, default: Date.now}
});

//Create model with schema
var Chat = mongoose.model('Message', chatSchema);

//Set resources folder (css, js, etc..)
//so that the client can request resources..
app.use(express.static('public'));

//Set views folder to current folder
//Required for render method
app.set("views", ".");

//Set view engine to ejs (because jade is confusing)
app.set("view engine", "ejs");

//Set port to process port or fall back to 5000 (e.g. localhost)
var port = process.env.PORT || 5000;

server.listen(port);

//on get request on root url, render index.ejs
app.get("/", function(req,res){
  res.render("index");
});

//True business, event listener for new connected socket
io.sockets.on('connection', function (socket) {

  //On connection, send this to current client
  socket.emit('initmessage', 'Vous etes bien connecte!');
  
  //Send this to other connected clients
  socket.broadcast.emit('initmessage', 'Un autre client vient de se connecter !');
  var query = Chat.find({});
  query.sort('-created').limit(5).exec(function(err,olddocs){
    if(err) throw err;
    console.log("Sending old msgs");
    socket.emit("old msgs", olddocs);
  });
  //On reception of a message
  socket.on('message', function (message) {
    var newMessage = new Chat({msg: message});
    newMessage.save(function(err){
      if(err) throw err;
      else {
        //Send to current client
        socket.emit('broadcast', message);
        //Broadcast it to other connected clients
        socket.broadcast.emit('broadcast', message);
      }
    }); 
  });
});
