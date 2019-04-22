'use strict';
const Survey = require('../models/survey');

module.exports.survey = async function(req, res, next) {
  if(!req.body) { res.status(400).send('Brak danych'); }
  try {
    const newSurvey = new Survey({
      userName: req.userData.name,
      userGroup: req.userData.group,
      surveyData: req.body.survey
    });
    const saved = await newSurvey.save();
    if (saved) {
      res.json({name: req.userData.name});
    }
  }
  catch (err) {
    res.status(400).send(err);
  }
}