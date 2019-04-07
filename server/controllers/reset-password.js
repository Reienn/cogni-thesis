'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require('moment');
const nodemailer = require("nodemailer");

const User = require('../models/user');
const ResetPassword = require('../models/reset-password');

const MAIL_ADDRESS = process.env.MAIL_ADDRESS ? process.env.MAIL_ADDRESS : require('../settings.conf.json').mail.address;
const MAIL_PSW = process.env.MAIL_PSW ? process.env.MAIL_PSW : require('../settings.conf.json').mail.psw;
const TOKEN_EXPIRY = 3600; // seconds

module.exports.resetPassword = async function(req, res, next) {
  try {
    const user = await User.findOne({mail: req.body.mail});
    if (!user) { throw 'nouser'; }
    const resetPsw = await ResetPassword.findOne({userName: user.name});
    let removed;
    if (resetPsw) {
      removed = await resetPsw.remove();
    }
    if (!resetPsw || removed) {
      const token  = crypto.randomBytes(32).toString('hex');
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(token, 10, function(err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
      const newResetPsw = new ResetPassword({
        userName: user.name,
        resetPswToken: hash,
        expire: moment.utc().add(TOKEN_EXPIRY, 'seconds')});
      const saved = await newResetPsw.save();
      if (saved) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: MAIL_ADDRESS,
            pass: MAIL_PSW
          }
        });
        const mailOptions = {
          to: user.mail,
          from: MAIL_ADDRESS,
          subject: 'Gra AHA - resetowanie hasła',
          html: `<h3>Gra &bdquo;AHA!&rdquo; - resetowanie hasła</h3>
            <p>Aby zresetować hasło, kliknij w poniższy link:</p>
            <p><a href="https://asd-reading-game.herokuapp.com/reset;id=${user.name};token=${token}">
              https://asd-reading-game.herokuapp.com/reset;id=${user.name};token=${token}
            </a></p>`
        };
        const info = await transporter.sendMail(mailOptions)
        console.log(`Reset password message send to ${user.name}`, info.messageId);
        res.json({name: user.name});
      }
    }
  } catch (err) {
    if (err === 'nouser') {
      res.status(422).send('Nie znaleziono podanego adresu email');
    } else {
      res.status(400).send(err);
    }

  }
}