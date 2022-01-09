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

exports.io = io;

app.use(cors());
app.use(express.json());

http.listen(PORT, () => {
  console.log('listening on:' + PORT);
});

const userRouter = require('./routes/userRoute');
const messageRouter = require('./routes/messageRoute');

app.use('/users', userRouter);
app.use('/messages', messageRouter);
