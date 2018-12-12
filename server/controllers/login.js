const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.login = function(req, res, next) {
  if(!req.body) { res.send(400).send('Brak danych'); }

  User.findOne({name: req.body.name}, (err, user) => {
    if(err) return next(err);
    if(user && bcrypt.compareSync(req.body.psw, user.psw)) {
      jwt.sign({name: user.name, group: user.group, currentCase: user.currentCase}, 'secretkey', {expiresIn: '7d'}, (err, token) => {
        if(err) return next(err);
        res.json({token: token, group: user.group, name: user.name, currentCase: user.currentCase});
      });
      console.log('login: '+user.name);
    } else {
      res.status(422).send('Błędne dane');
    }
  });
}