var jwtSupport = require('../util/jwtSupport')
var Jobs = require('../models/job')

class JobsController {

    async findAll(req, res) {
       let response = await Jobs.getAll(req);
        res.json({"results": response});
    }

    async createNew(req, res) {
        let response = await Jobs.create(req);
        res.json(response);
    }

    async deleteJob(req, res) {
      let response = await Jobs.detele(req);
      res.json(response);
    }

    async updateJob(req, res) {
      let response = await Jobs.update(req);
      res.json(response);
    }
}

module.exports = new JobsController();