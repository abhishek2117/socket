const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server is running');
io.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets are connected', connections.length);

    setInterval(intervalFunc, 1500);

    //Disconnect 
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets are connected', connections.length);
    });

    socket.on('NodeJS server port', function(data) {
        console.log(data);
        io.sockets.emit('iOS Client Port', {msg: 'Hi Manish!'});
    });
});

function intervalFunc() {
    io.sockets.emit('iOS Client Port', {msg: 'Hi Calling from Loop!'});
  }
  

// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });