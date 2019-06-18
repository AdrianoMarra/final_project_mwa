var express = require('express');
var router = express.Router();
var JobsController = require('../controllers/jobs')

/* GET list of all jobs. */
router.get('/', (req, res) => JobsController.findAll(req, res));

/* POST new job. */
router.post('/', (req, res) => JobsController.createNew(req, res));

module.exports = router;
