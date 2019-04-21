'use strict';
const User = require('../models/user');

module.exports.customTaskData = function(req, res, next) {
  if(!req.body) { res.status(400).send('Brak danych'); }
  let user = req.userData;
  User.findOneAndUpdate({name: req.body.playerName, educator: user.name}, {
    $set: { customTaskData: req.body.customTaskData },
    $push: {customTaskModified: {contentType: req.body.type, date: new Date()}}
  }, function(err){
    if (err) { res.status(400).send('Nie można zapisać ustawień.'); }
    else {
      console.log(`Updated customTaskData of player ${req.body.playerName}.`);
      res.json({name: req.body.playerName});
    }
  });
}