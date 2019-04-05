const User = require('../models/user');

module.exports.updatePerformance = function(req, res, next) {
  if(!req.body) { res.status(400).send('Brak danych'); }
  let user = req.userData;
  User.findOneAndUpdate({name: user.name}, {
    $push: { performance: req.body.performance },
    $set: { bestScores: req.body.bestScores },
    $max: { currentCase: req.body.id }
  }, function(err){
    if (err) { res.status(400).send('Nie można zaktualizować danych'); }
    else {
      console.log(`Updated performance of player ${user.name}.`);
      res.send(req.body.performance);
    }
  });
}