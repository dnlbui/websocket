const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// class Server is a constructor function that takes a server object as an argument
const { Server } = require('socket.io');
const io = new Server(server);

// sends file as a response to '/' get request
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// listens for a connection event on the socket
// io.on() is a method that takes an event name and a callback function
// the callback function is called whenever a socket connects to the server
// the callback function is passed a socket object as an argument
// the socket object represents the connection between the client and the server
io.on('connection', (socket) => {
  console.log('a user connected');

  // listens for a chat message event on the socket
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  // each socket also fires a special disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});