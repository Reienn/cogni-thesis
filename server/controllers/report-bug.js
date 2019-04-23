'use strict';
const BugReport = require('../models/bug-report');

module.exports.reportBug = async function(req, res, next) {
  if(!req.body) { res.status(400).send('Brak danych'); }
  try {
    const bugReport = new BugReport({
      userName: req.userData.name,
      message: req.body.message,
      url: req.body.url
    });
    const saved = await bugReport.save();
    if (saved) {
      res.json({name: req.userData.name});
    }
  }
  catch (err) {
    res.status(400).send(err);
  }
}