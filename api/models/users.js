
class Users {

    async getAll(req) {
        let findQuery = {};

        if(req.query.latitude && req.query.longitude) {

            findQuery['address.location'] = { 
                $near: {
                    $geometry: { "coordinates": [Number(req.query.longitude), Number(req.query.latitude)] },
                    $maxDistance: 2000
                  }
             };
        }

        if(req.query.description) {
            findQuery = {$text: {$search : req.query.description}};
        }

        if(req.query.name) {
            findQuery['$or'] = [{ 'name.first': { '$regex': req.query.name, '$options': 'i' } }
                                ,{ 'name.last': { '$regex': req.query.name, '$options': 'i' } }];
        } 

        if(req.query.job) {
            findQuery['job.title'] = req.query.job;
        } 

        if(req.query.experience) {
            findQuery['experience'] =  {$gte: req.query.experience};
        }

        if(req.query.hour_rate_max && req.query.hour_rate_min) {
            let max = req.query.hour_rate_max;
            let min = req.query.hour_rate_min;
            findQuery['hour_rate'] = {$gte: Number(min), $lte: Number(max)};
        }

         //console.log(findQuery);

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
            .delete({_id: Number(req.params.id) });
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
        .insertOne(req.body);
        
        if(results.insertedCount===1){
          //reading the inserted Worker along with the DB id
          return results.ops[0];
        }


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
        .findOne(req.body);
        return results;
     }
}

module.exports  = new Users();