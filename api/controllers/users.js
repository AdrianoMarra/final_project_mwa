var Users = require('../models/users')

class UsersController {

    async findAll(req, res) {
        let response = await Users.getAll(req);
        res.json(response);
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