var socket = io.connect(window.location.hostname);
function emitToServer(msg){
  socket.emit('message', msg.value);
  $("#msg").val('');
}

$(document).ready(function(){
socket.on('broadcast', function(msg) {
    var fullmsg = $('<p class="msg">'+msg+'</p>');
    $('#chatbox').append(fullmsg).children(':last').hide().fadeIn(200);
    });

socket.on('initmessage', function(msg) {
    var fullmsg = $('<p><strong>'+msg+'</strong></p>');

    $('#chatbox').append(fullmsg).children(':last').hide().fadeIn();
    });
});
