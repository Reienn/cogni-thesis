'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const SECRET_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : require('../settings.conf.json').jwt.key;

module.exports.login = function(req, res, next) {
  if(!req.body) { res.send(400).send('Brak danych'); }

  User.findOne({name: req.body.name}, (err, user) => {
    if(err) return next(err);
    if(user && bcrypt.compareSync(req.body.psw, user.psw)) {
      jwt.sign({name: user.name, group: user.group, currentCase: user.currentCase}, SECRET_KEY, {expiresIn: '7d'}, (err, token) => {
        if(err) return next(err);
        res.json({token: token,
                  group: user.group,
                  name: user.name,
                  currentCase: user.currentCase,
                  bestScores: user.bestScores,
                  educator: user.educator,
                  mail: user.mail});
      });
      console.log('login: '+user.name);
    } else {
      res.status(422).send('Błędne dane');
    }
  });
}