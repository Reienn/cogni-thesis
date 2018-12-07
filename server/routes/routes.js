const cors = require('cors');

const loginController= require('../controllers/login');
const signupController = require('../controllers/signup');
const authUserController = require('../controllers/auth-user');
const updatePerformanceController = require('../controllers/update-performance');
const playersPerformanceController = require('../controllers/players-performance');
const jwt = require('../services/jwt');


module.exports = function(app) {
  const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));

  app.post('/api/login', loginController.login);

  app.post('/api/signup', signupController.signup);

  app.get('/api/auth-user', jwt.verifyToken, authUserController.authUser);

  app.post('/api/performance', jwt.verifyToken, updatePerformanceController.updatePerformance);

  app.get('/api/players-performance', jwt.verifyToken, playersPerformanceController.playersPerformance);
}