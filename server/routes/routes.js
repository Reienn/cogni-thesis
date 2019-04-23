'use strict';
const cors = require('cors');

const loginController= require('../controllers/login');
const signupController = require('../controllers/signup');
const resetPassword = require('../controllers/reset-password');
const newPassword = require('../controllers/new-password');
const authUserController = require('../controllers/auth-user');
const updateUserController = require('../controllers/update-user');
const updatePerformanceController = require('../controllers/update-performance');
const playersPerformanceController = require('../controllers/players-performance');
const surveyController = require('../controllers/survey');
const customTaskDataController = require('../controllers/custom-task-data');
const getCustomTaskDataController = require('../controllers/get-custom-task-data');
const reportBugController = require('../controllers/report-bug');
const jwt = require('../services/jwt');


module.exports = function(app) {
  const corsOptions = {
    origin: 'http://www.gra-aha.pl',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));

  app.post('/api/login', loginController.login);

  app.post('/api/signup', signupController.signup);

  app.post('/api/reset-password', resetPassword.resetPassword);

  app.post('/api/new-password', newPassword.newPassword);

  app.post('/api/update-user', jwt.verifyToken, updateUserController.updateUser);

  app.post('/api/survey', jwt.verifyToken, surveyController.survey);

  app.post('/api/report-bug', jwt.verifyToken, reportBugController.reportBug);

  app.get('/api/get-custom-task-data', jwt.verifyToken, getCustomTaskDataController.getCustomTaskData);

  app.post('/api/custom-task-data', jwt.verifyToken, customTaskDataController.customTaskData);

  app.get('/api/auth-user', jwt.verifyToken, authUserController.authUser);

  app.post('/api/performance', jwt.verifyToken, updatePerformanceController.updatePerformance);

  app.get('/api/players-performance', jwt.verifyToken, playersPerformanceController.playersPerformance);
}