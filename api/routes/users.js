var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users')
var jwtSupport = require('../util/jwtSupport')


/* GET list of all users. */
router.get('/', (req, res) => UsersController.findAll(req, res));

/* GET one user. */
router.get('/:id', (req, res) => UsersController.find(req, res));

/* POST new user. */
router.post('/', (req, res) => UsersController.createNew(req, res));

/* Authentication an existing user. */

router.post('/authenticate', (req, res) => UsersController.authenticate(req, res));

/* update an existing user profile. */
router.patch('/',(req,res) => jwtSupport.verifyToken(req,res) ,(req, res) => UsersController.updateExistingUserProfile(req, res));




module.exports = router;
