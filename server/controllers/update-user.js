const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.updateUser = function(req, res, next) {
  if(!req.body) { res.status(400).send('Brak danych'); }
  let userUpdate = req.body.userUpdate;
  if (userUpdate.update && userUpdate.update.psw) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userUpdate.update.psw, salt);
    userUpdate.update.psw = hash;
  }
  User.findOneAndUpdate({name: userUpdate.name}, userUpdate.update, function(err){
    if (err) { res.status(400).send('Nie można zaktualizować danych'); }
    else {
      console.log(`Updated data of user ${userUpdate.name}.`);
      res.json({name: userUpdate.name});
    }
  });
}