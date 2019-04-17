'use strict';
const User = require('../models/user');

module.exports.getCustomTaskData = function(req, res, next) {
  User.find({name: req.userData.name}, 'customTaskData', function(err, data){
    if(err){ res.status(400).send('Nie znaleziono danych'); }
    res.send(data);
  });
}