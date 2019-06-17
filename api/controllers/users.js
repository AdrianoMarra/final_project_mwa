var Users = require('../models/users')

class UsersController {

    async findAll(req, res) {
       let response = await Users.getAll(req);

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

    async find(req, res) {
        let response = await Users.get(req);
        res.json(response);
    }

    async createNew(req, res) {
        let response = await Users.create(req);
        res.json(response);
    }

    async deleteUser(req, res) {
      let response = await Users.detele(req);
      res.json(response);
    }

    async updateUser(req, res) {
      let response = await Users.update(req);
      res.json(response);
    }
}

module.exports = new UsersController();