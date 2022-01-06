const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

const ATLAS_URI = process.env.ATLAS_URI;
mongoose.connect(ATLAS_URI);

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

const userRouter = require('./routes/userRoute');

app.use('/users', userRouter);

app.get('/user', (req, res) => {
  res.send('asdf')
});

let chat = {
  chatName: 'private',
  messages: [
    {user: 'maciej', message: 'dupa', id: 0},
    {user: 'marcin', message: 'one11', id: 1}
  ]
}

let arr = '';

io.on('connection', socket => {
  console.log('new connection');

  socket.emit('chat', chat);

  socket.on('addMessage', (elem) => {
    chat.messages.push(elem);
    socket.emit('chat', chat);
  })

  socket.emit('privateMessage', arr)

  socket.on('addElem', (elem) => {
    arr = elem;
    socket.emit('privateMessage', arr);
  })

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
})
