'use strict';
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
  educator: {
    type: String
  },

  students: [String],

  gameplayTime: Number,
  loginDates: [Date],
  currentCase: Number,
  bestScores: [Number],
  performance: [{
    case: Number,
    task: Number,
    timestamp: Date,
    points: Number,
    maxPoints: Number
  }]

});

module.exports = mongoose.model('User', UserSchema);