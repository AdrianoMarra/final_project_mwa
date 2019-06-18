var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users')
var jwtSupport = require('../util/jwtSupport')
var verifyToken = require('../middlewares/verifyToken');


/* GET list of all users. */
router.get('/', (req, res) => UsersController.findAll(req, res));

/* GET User dashboard. */
router.get('/dashboard', verifyToken, (req, res) => UsersController.getDashboardData(req, res));

/* GET one user. */
router.get('/:id', (req, res) => UsersController.find(req, res));

/* POST new user. */
router.post('/', (req, res) => UsersController.createNew(req, res));

/* Authenticate user. */
router.post('/authenticate', (req, res) => UsersController.authenticate(req, res));

/* update an existing user profile. */
router.patch('/', verifyToken ,(req, res) => UsersController.updateExistingUserProfile(req, res));


module.exports = router;
