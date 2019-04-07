'use strict';
const mongoose = require('mongoose');

const ResetPasswordSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  resetPswToken: {
    type: String
  },
  expire: {
    type: Date
  }

});

module.exports = mongoose.model('ResetPassword', ResetPasswordSchema);