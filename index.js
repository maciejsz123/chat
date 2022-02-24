const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: 'ENV_FILENAME' });
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

exports.io = io;

http.listen(PORT, () => {
  console.log('listening on:' + PORT);
});

const { createChatSocket, updateGroupChatSocket } = require('./routes/chatRoute');
const { messageSocket } = require('./routes/messageRoute');

let usersOnline = {};

io.on('connection', socket => {
  socket.on('createChat', ({ name, privateType, users }) => createChatSocket({ name, privateType, users }));
  socket.on('updateGroupChat', ({ chatId, userId }) => updateGroupChatSocket({ chatId, userId }));
  socket.on('message', ({userId, chatId, message}) => messageSocket({ userId, chatId, message }));

  socket.on('sendUserStatus', ( id ) => {
    usersOnline[socket.id] = id;
    io.emit('receiveUsersStatusBack', { usersOnline });
  })

  socket.on('logout', (id) => {
    for(user in usersOnline) {
      if(usersOnline[user] === id) {
        delete usersOnline[user];
      }
    }
    io.emit('receiveUsersStatusBack', { usersOnline });
  })

  socket.on('disconnect', () => {
    delete usersOnline[socket.id];
    io.emit('receiveUsersStatusBack', { usersOnline });
  })
});

app.use(cors());
app.use(express.json());

const { userRouter } = require('./routes/userRoute');
const { messageRouter } = require('./routes/messageRoute');
const { chatRouter } = require('./routes/chatRoute');

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "./chat/build")));

  app.get('*', (req, res) => {
    res.sendFile(path.reslove(__dirname, 'chat', 'build', 'index.html'))
  })
}

app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/chats', chatRouter);
