const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
    unique: false
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: true,
    unique: false
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 3,
    required: true,
    unique: false
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
