const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  name: String,
  privateType: {
    type: Boolean //private if false it's group
  },
  users: Array,
  messages: Array
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
