'use strict';
const User = require('../models/user');

module.exports.playersPerformance = function(req, res, next) {
  if(!req.body) { res.status(400).send('Brak danych'); }
  User.find({group: 'student', educator: req.userData.name}, 'name performance customTaskData customTaskModified bestScores currentCase lastActivityAt', function(err, data){
    if(err){ res.status(400).send('Nie znaleziono danych'); }
    res.send(data);
  });
}