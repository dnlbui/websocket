const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// sends file as a response to '/' get request
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});