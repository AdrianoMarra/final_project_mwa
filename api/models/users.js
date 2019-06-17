
class Users {

    async getAll(req) {
        let min = 0;
        let max = 1000;
        let findQuery = {};

        if(req.query.name != null) {
            findQuery['name.first'] =  {$regex: '^'+req.query.name};
        } 

        console.log(findQuery);

        if(req.query.specialty != null) {
            findQuery['specialty.name'] = {$text: {$search : req.query.specialty}};
        } 
        if(req.query.experience != null) {
            findQuery['experience'] = req.query.experience;
        }
        if(req.query.hour_rate_max != null) {
            max = req.query.hour_rate_max;
        }
        if(req.query.hour_rate_min != null) {
            min = req.query.hour_rate_min;
        }
        findQuery['hour_rate'] = {$gte: min, $lte: max};

        let results = await req.db.collection('users')
        .find(findQuery)
        .sort({'name.first': 1, 'name.last': 1})
        .toArray();

        return results;
    }

    async get(req) {
        let results = await req.db.collection('users')
        .findOne({_id: Number(req.params.id) });

        return results;
    }

    async delete(req) {
        try{
            await req.db.collection('users')
            .remove({_id: Number(req.params.id) });
        } catch (err ){
            console.log('There is a problem when removing an user. Error: ' + err);
        }
       
        return {results: 'Succeccfully removed'};
    }

    async update(req) {
        try {
            await req.db.collection('users')
        .updateOne({_id: Number(req.params.id) },
                   {$set: req.body});
        } catch (err) {
            console.log('There is a problem when updating an user. Error: ' + err);
        }

        return {results: 'Succeccfully updated'};
    }

    async create(req) {

        req.body._id = await this.getNextSequenceValue(req.db.collection('counter_users'));
        let results = await req.db.collection('users')
        .insert(req.body);

        return results;
    }

    async getNextSequenceValue(collection) {
        
        let sequenceDocument = await collection.findOneAndUpdate(
           {"_id": 'userid' },
           { $inc: { "sequence_value": 1 } }
        );

        return sequenceDocument.value.sequence_value;
     }
}

module.exports  = new Users();