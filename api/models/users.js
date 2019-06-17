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

    async create(req) {

        req.body._id = await this.getNextSequenceValue(req.db.collection('counter_users'));
        let results = await req.db.collection('users')
        .insertOne(req.body);

        return results;
    }

    async getNextSequenceValue(collection) {
        let sequenceDocument = await collection.findOneAndUpdate(
           {"_id": 'userid' },
           { $inc: { "sequence_value": 1 } }
        );

        return sequenceDocument.value.sequence_value;
     }

     async authenticate(req){
        let results = await req.db.collection('users')
        .find({email:req.body.email,password:req.body.password})
        .toArray();
        if(results.length > 0){
          results[0].password='';
          results.userWithOutPassword=results[0];
        }
        return results; 
     }
}

module.exports  = new Users();