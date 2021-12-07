const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 5000;
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>hello</h1>');
});

server.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});
