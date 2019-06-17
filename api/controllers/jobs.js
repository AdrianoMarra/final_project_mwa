var jwtSupport = require('../util/jwtSupport')
var Jobs = require('../models/job')

class JobsController {

    async findAll(req, res) {
       let response = await Jobs.getAll(req);

        const resultsPerPage = 4;
        const pageCount = Math.ceil(response.length / resultsPerPage);
        let page = parseInt(req.query.page);
        if (!page) { page = 1;}
        if (page > pageCount) {
          page = pageCount
        }
        res.json({
          "current_page": page,
          "total_pages": pageCount,
          "next": (page < pageCount) ? page + 1: null,
          "prev": (page > 1)? page - 1: null,
          "results": response.slice(page * resultsPerPage - resultsPerPage, page * resultsPerPage)
        });
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