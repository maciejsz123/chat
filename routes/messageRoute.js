const Message = require('../models/messages');
const router = require('express').Router();
const urlencodedParser = require('./urlEncoded');//to post requests

router.route('/').get( (req, res) => {
  Message.find()
    .then( messages => res.json(messages))
    .catch( err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(urlencodedParser, (req, res) => {

  const userId = req.body.userId;
  const message = req.body.message;

  const newMessage = new Message({ userId, message });

  newMessage.save()
    .then( () => res.json('User added'))
    .catch( err => res.send(err))
  )
})

router.route('/delete/:id').delete(urlencodedParser, (req, res) => {

  const userId = req.body.userId;
  const message = req.body.message;

  const newMessage = new Message({ userId, message });

  newMessage.delete()
    .then( () => res.json('User added'))
    .catch( err => res.send(err))
  )
})

module.exports = router;
