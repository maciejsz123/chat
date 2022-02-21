const Chat = require('../models/chat');
const router = require('express').Router();
const urlencodedParser = require('./urlEncoded');//to post requests

router.route('/').get( (req, res) => {
  Chat.find()
    .then( messages => res.json(messages))
    .catch( err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete( (req,res) => {
  Chat.findByIdAndDelete(req.params.id)
    .then( chat => res.json(`deleted`))
    .catch( err => res.status(400).json('Error' + err))
})

function createChatSocket({ name, privateType, users }) {
  try {
    const newChat = new Chat({ name, privateType, users});
    newChat.save()
      .then( data => {
        return data._id;
      })
      .then( data => {
        io.emit('receiveChatBack', { chatId: data, name, privateType, users: [users] })
      })
  } catch(err) {
    throw(err);
  }
}

function updateGroupChatSocket({ chatId, userId }) {
  try {
    Chat.findOne({_id: chatId}, (err, obj) => {
      Chat.findByIdAndUpdate(obj._id, {'users': [...obj.users, userId]})
      .then( data => {
        io.emit('receiveUpdatedChatBack', { chatId: data._id, name: data.name, privateType: data.privateType, users: data.users })
      })
    })
  } catch(err) {
    throw(err);
  }
}

module.exports = router;
exports.updateGroupChatSocket = updateGroupChatSocket;
exports.createChatSocket = createChatSocket;
