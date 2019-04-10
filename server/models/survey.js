'use strict';
const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },
  surveyData: {
    likert: {},
    comments: String
  }
});

module.exports = mongoose.model('Survey', SurveySchema);