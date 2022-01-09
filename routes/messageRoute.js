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
  socket.on('message', ({ userId, chatName, message }) => {
    try {
      const newMessage = new Message({ userId, chatName, message});
      newMessage.save()
    } catch(err) {
      throw(err);
    } finally{
      io.emit('receiveMessageBack', { userId, chatName, message })
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
