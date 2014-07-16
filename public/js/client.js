//---------------------
// CLIENT LOGIC
//---------------------

var socket = io.connect(window.location.hostname);

//function used to send messages 
function emitToServer(msg){
  socket.emit('message', msg.value);
  $("#msg").val('');
}

function printMessage(msg, info){
  if(info){
        var fullmsg = $('<p><strong>'+msg+'</strong></p>');
            $('#chatbox').append(fullmsg).children(':last').hide().fadeIn();
  } else {
        var fullmsg = $('<p>'+msg+'</p>');
            $('#chatbox').append(fullmsg).children(':last').hide().fadeIn(200);
  }
}

//Wait for the DOM to be loaded by the browser
$(document).ready(function(){
  
  //When client receives a message of type 'broadcast' 
  socket.on('broadcast', function(msg) {
    printMessage(msg);
  });
 
  socket.on('old msgs', function(msgs) {
   for(var i=msgs.length-1;i>=0;i--){
     printMessage(msgs[i].msg);
   }
  });
  //When client receives a message of type 'init message'
  socket.on('initmessage', function(msg) {
    printMessage(msg,1);
  });
});
