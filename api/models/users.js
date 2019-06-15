class Users {

    async getAll(req) {
        let results = await req.db.collection('users')
        .find({})
        .toArray();

        return results;
    }
}

module.exports  = new Users();