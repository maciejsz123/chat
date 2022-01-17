const Chat = require('../models/chat');
const router = require('express').Router();
const urlencodedParser = require('./urlEncoded');//to post requests
const { io } = require('../index.js');

router.route('/').get( (req, res) => {
  Chat.find()
    .then( messages => res.json(messages))
    .catch( err => res.status(400).json('Error: ' + err))
})

io.on('connection', socket => {
  socket.on('createChat', ({ name, privateType, users }) => {
    try {
      const newChat = new Chat({ name, privateType, users});
      newChat.save()
        .then( data => {
          return data._id;
        })
        .then( data => {
          io.emit('receiveChatBack', { chatId: data, name, privateType, users })
        })
    } catch(err) {
      throw(err);
    }
  })

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
});

router.route('/:id').delete( (req,res) => {
  Chat.findByIdAndDelete(req.params.id)
    .then( chat => res.json(`deleted`))
    .catch( err => res.status(400).json('Error' + err))
})

module.exports = router;
