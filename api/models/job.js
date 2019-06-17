
class Jobs {

    async getAll(req) {
        let results = await req.db.collection('specialties')
        .find({})
        .sort({'name': 1})
        .toArray();

        return results;
    }

    async create(req) {

        req.body._id = await this.getNextSequenceValue(req.db.collection('counter_jobs'));
        let results = await req.db.collection('specialties')
        .insertOne(req.body);

        return results;
    }
//todo:
    async delete(req) {

        try{
            await req.db.collection('specialties')
            .delete({_id: Number(req.params.id) });
        } catch (err ){
            console.log('There is a problem when removing an job. Error: ' + err);
        }
       
        return {results: 'Succeccfully removed'};
    }
//todo:
    async update(req) {

        try {
            await req.db.collection('specialties')
        .updateOne({_id: Number(req.params.id) },
                   {$set: req.body});
        } catch (err) {
            console.log('There is a problem when updating an job. Error: ' + err);
        }

        return {results: 'Succeccfully updated'};
    }

    async getNextSequenceValue(collection) {
        
        let sequenceDocument = await collection.findOneAndUpdate(
           {"_id": 'jobid' },
           { $inc: { "sequence_value": 1 } }
        );

        return sequenceDocument.value.sequence_value;
     }
}

module.exports  = new Jobs();