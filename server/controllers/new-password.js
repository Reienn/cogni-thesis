'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../models/user');
const ResetPassword = require('../models/reset-password');

module.exports.newPassword = async function(req, res, next) {
  try {
    const resetRecord = await ResetPassword.findOne({
      userName: req.body.id,
      expire: { $gt: moment.utc() }
    });
    if (!resetRecord) { throw 'notoken' };
    const resBcrypt = await new Promise((resolve, reject) => {
      bcrypt.compare(req.body.token, resetRecord.resetPswToken, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
    if (!resBcrypt) { throw 'notoken' };
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.psw, salt);
    const updated = await User.findOneAndUpdate({name: resetRecord.userName}, {psw: hash});
    if (updated) {
      const removed = await resetRecord.remove();
      res.json({name: updated.name});
      console.log(`Updated password of user ${updated.name}.`);
    }
  } catch (err) {
    if (err === 'notoken') {
      res.status(422).send('Link jest niepoprawny lub wygasł.');
    } else {
      res.status(400).send('Nie można zaktualizować hasła');
    }

  }
}