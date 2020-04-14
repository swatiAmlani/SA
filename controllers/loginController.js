const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var { Login } = require('../model/login');
const secret = 'mysecretsshhh';

module.exports.register = (req,res,next) => {
var userIn = new Login();
userIn.username = req.body.username;
userIn.email = req.body.email;
userIn.password = req.body.password;
  userIn.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
       if(err.code == 11000) {
         if(err.message.includes('username')) {
           res.status(422).send(['Duplicate username found']);
         }
         else {
           res.status(422).send(['Duplicate email found']);
         }
       }
       else {
          return next(err);
       }
    }
  });
}


module.exports.validate = (req, res) => {
  const { username, password } = req.body;
  Login.findOne({ username }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect username or password'
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
}
