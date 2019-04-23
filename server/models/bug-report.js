'use strict';
const mongoose = require('mongoose');

const BugReportSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('BugReport', BugReportSchema);