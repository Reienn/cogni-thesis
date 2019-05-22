'use strict';
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : require('../settings.conf.json').jwt.key;

module.exports.verifyToken = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userData = jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    res.status(400).send({error: 'Token verification failed'});
  }
}