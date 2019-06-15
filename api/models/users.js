class Users {

    async getAll(req) {
        let results = await req.db.collection('users')
        .find({})
        .toArray();

        return results;
    }

    async get(req) {
        let results = await req.db.collection('users')
        .findOne({_id: Number(req.params.id) });

        return results;
    }
}

module.exports  = new Users();