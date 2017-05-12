var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');

    whiteboard.on('draw', function(start, end, color) {
    // console.log(param1, param2, param3);
      console.log('payload', start, end, color);
      socket.emit('imdrawing', { start, end, color });
    });

    socket.on('drawing', function(payload){
      whiteboard.draw(payload.start, payload.end, payload.color);
    });

});




