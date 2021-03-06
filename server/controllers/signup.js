'use strict';
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.signup = function(req, res, next) {
  if(!req.body) { res.send(400).send('Brak danych'); }

  User.count({name: req.body.name}, (err, count) => {
    if(err) { return next(err); }
    if(count != 0) { return res.status(409).send('Nazwa użytkownika jest już zajęta.'); }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.psw, salt);
    let user = new User({mail: req.body.mail, name: req.body.name, psw: hash, group: req.body.group, performance: [], educator: req.body.educator});
    user.save(function(err){
      if(err) { return next(err); }
    });
    res.json({name: req.body.name});
    console.log("User "+req.body.name+' signed up.');

  });
}