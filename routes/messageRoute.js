const Message = require('../models/messages');
const router = require('express').Router();
const urlencodedParser = require('./urlEncoded');//to post requests
const { io } = require('../index.js');

router.route('/').get( (req, res) => {
  Message.find()
    .then( messages => res.json(messages))
    .catch( err => res.status(400).json('Error: ' + err))
})

io.on('connection', socket => {
  socket.on('message', ({ userId, chatId, message }) => {
    try {
      const newMessage = new Message({ userId, chatId, message});
      newMessage.save()
        .then( data => {
          return data._id;
        })
        .then( data => {
          io.emit('receiveMessageBack', { messageId: data, userId, chatId, message })
        })
    } catch(err) {
      throw(err);
    }
  })

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
});

/*router.route('/add').post(urlencodedParser, (req, res) => {

  const userId = req.body.userId;
  const message = req.body.message;
  const chatName = req.body.chatName;

  const newMessage = new Message({ userId, chatName, message });

  newMessage.save()
    .then( () => res.json('Message added'))
    .catch( err => res.send(err))
})*/

router.route('/:id').delete( (req,res) => {
  Message.findByIdAndDelete(req.params.id)
    .then( chat => res.json(`${chat} deleted`))
    .catch( err => res.status(400).json('Error' + err))
})

module.exports = router;
