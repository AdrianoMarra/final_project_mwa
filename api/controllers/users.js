var express = require('express');
var router = express.Router();
var Users = require('../models/users')

/* GET list of all users. */
router.get('/', async function (req, res) {

  let response = await Users.getAll(req);
  res.json(response);

});

module.exports = router;
