(function() {
  var socket = io();

  socket.emit('chat message', 'Bienvenu sur le chat de Bakpak');
})();