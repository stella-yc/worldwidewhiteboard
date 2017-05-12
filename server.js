var path = require('path');
var express = require('express');
var app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!
var socketio = require('socket.io');


// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
var server = app.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

var io = socketio(server);

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);

    socket.on('disconnect', function(socket) {
        console.log('socket disconnected :(', socket.id);
    });

    socket.on('imdrawing', function(payload) {
        console.log('here is the payload', payload);

        //emit event telling other sockets there is drawing
        // console.log('socket.id', socket.id);
        // console.log('io.sockets', io.sockets.sockets);
        //get ids by getting the keys of io.sockets.sockets

        // console.log(Object.keys(io.sockets.sockets));
        // var socketIds = Object.keys(io.sockets.sockets);
        // socketIds.forEach(function(id) {
        // })

        socket.broadcast.emit('drawing', payload);
    })
});




app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

