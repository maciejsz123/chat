const express = require('express');
const PORT = 5000;
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

http.listen(PORT, () => {
  console.log('listening on:' + PORT);
});

let arr = '';

io.on('connection', socket => {
  console.log('new connection');

  socket.emit('privateMessage', arr)

  socket.on('addElem', (elem) => {
    arr = elem;
    socket.emit('privateMessage', arr);
  })

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
})
