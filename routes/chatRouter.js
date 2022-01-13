const Chat = require('../models/chat');
const router = require('express').Router();
const urlencodedParser = require('./urlEncoded');//to post requests
const { io } = require('../index.js');

router.route('/').get( (req, res) => {
  Chat.find()
    .then( messages => res.json(messages))
    .catch( err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(urlencodedParser, (req, res) => {

  const name = req.body.name;
  const privateType = req.body.privateType;
  const users = req.body.users;

  const newChat = new Chat({ name, privateType, users });

  newChat.save()
    .then( () => res.json('Chat added'))
    .catch( err => res.send(err))
})

router.route('/:id').delete( (req,res) => {
  Chat.findByIdAndDelete(req.params.id)
    .then( chat => res.json(`deleted`))
    .catch( err => res.status(400).json('Error' + err))
})

module.exports = router;
