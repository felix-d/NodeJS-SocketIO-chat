//---------------------
// CLIENT LOGIC
//---------------------

var socket = io.connect(window.location.hostname);

//function used to send messages 
function emitToServer(msg){
  socket.emit('message', msg.value);
  $("#msg").val('');
}

//Wait for the DOM to be loaded by the browser
$(document).ready(function(){
  
  //When client receives a message of type 'broadcast' 
  socket.on('broadcast', function(msg) {
    var fullmsg = $('<p class="msg">'+msg+'</p>');
    $('#chatbox').append(fullmsg).children(':last').hide().fadeIn(200);
  });

  //When client receives a message of type 'init message'
  socket.on('initmessage', function(msg) {
    var fullmsg = $('<p><strong>'+msg+'</strong></p>');
    $('#chatbox').append(fullmsg).children(':last').hide().fadeIn();
  });
});
