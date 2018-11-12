const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  psw: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },

  students: {
    type: []
  },

  gamePlayTime: {
    type: Number
  },
  points: {
    type: Number
  }
});

module.exports = mongoose.model('User', UserSchema);