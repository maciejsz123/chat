const User = require('../models/users');
const router = require('express').Router();
const urlencodedParser = require('./urlEncoded');//to post requests
const { io } = require('../index.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret_key = process.env.SECRET_KEY || 'secret';

router.route('/').get( (req, res) => {
  User.find()
    .then( users => res.json(users))
    .catch( err => res.status(400).json('Error: ' + err))
})

router.route('/login').post(urlencodedParser, (req, res) => {
  User.findOne({'username': req.body.username})
    .then( user => {
      if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(user.toJSON(), secret_key, {
            expiresIn: 1440
          });
          res.send(user);
        } else {
          res.send('error')
        }
      } else {
        res.send('error')
      }
    })
    .catch( err => {
      res.send(err)
    })
})

router.route('/register').post(urlencodedParser, (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = hash;
    const online = false;

    const newUser = new User({ name, lastName, username, password, online });

    newUser.save()
      .then( () => res.json('User added'))
      .catch( err => res.send(err))
  })
})

io.on('connection', socket => {
  socket.on('sendOnlineUser', ({ _id, online }) => {
    try {
      User.findByIdAndUpdate(_id, {online}, (err, data) => {
        if(err) {
          console.log(err);
        } else {
          io.emit('receiveOnlineUsersBack', { data })
        }
      })
    } catch(err) {
      throw(err);
    }
  })

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
});

module.exports = router;
