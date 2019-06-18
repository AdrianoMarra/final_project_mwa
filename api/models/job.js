
class Jobs {

    async getAll(req) {
        let results = await req.db.collection('jobs')
        .find({})
        .sort({'title': 1})
        .toArray();

        return results;
    }

    async create(req) {
        console.log()
        req.body.id = await this.getNextSequenceValue(req.db.collection('counter_jobs'));
        let myobj = { id: req.body.id, title: req.body.query.title, description: req.body.query.description };
        let results = await req.db.collection('jobs')
        .insertOne(myobj);

        return results;
    }
//todo:
    async delete(req) {

        try{
            await req.db.collection('jobs')
            .delete({id: Number(req.params.id) });
        } catch (err ){
            console.log('There is a problem when removing an job. Error: ' + err);
        }
       
        return {results: 'Succeccfully removed'};
    }
//todo:
    async update(req) {

        try {
            await req.db.collection('jobs')
            .updateOne({id: Number(req.params.id) },
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