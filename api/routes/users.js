var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users')

/* GET list of all users. */
router.get('/', (req, res) => UsersController.findAll(req, res));

/* GET one user. */
router.get('/:id', (req, res) => UsersController.find(req, res));

/* POST new user. */
router.post('/', (req, res) => UsersController.createNew(req, res));


module.exports = router;
