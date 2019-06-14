var express = require('express');
var router = express.Router();

/* GET list of all lectures. */
router.get('/', async function (req, res) {
  
  let results = await req.db.collection('restaurants')
  .find(
    { "cuisine": {$nin: ["American ", "Chinese"]}
  })
  .limit(10)
  .toArray();

  res.json(results);

});

router.post('/', async function (req, resp, next) {
  
  let results = await db.collection('restaurants')
  .insertOne(req.body);

  resp.json(results);
});

/**
 * CRUD RICH DOCUMENT LEVEL 01
 */

router.put('/:rest_id/grades', async function (req, resp, next) {
  let id = req.params.rest_id;

  let results = await req.db.collection('restaurants')
  .updateOne(
    {restaurant_id: id}, 
    {$push: {"grades": req.body}}
    );

  resp.json(results);
});

router.patch('/:rest_id/grades/:score', async function (req, resp, next) {
  let id = req.params.rest_id;
  let score = Number(req.params.score);

  let results = await req.db.collection('restaurants')
  .updateOne(
    {restaurant_id: id}, 
    {$set: {"grades.$[obj].grade": req.body.grade}},
    {arrayFilters: [{"obj.score": score}]}
    );

  resp.json(results);
});

router.delete('/:rest_id/grades/:score', async function (req, resp, next) {
  let id = req.params.rest_id;
  let score = Number(req.params.score);

  let results = await req.db.collection('restaurants')
  .updateOne(
    {restaurant_id: id}, 
    {$pull: {"grades": {"score": score} }}
    );

  resp.json(results);
});

/**
 * CRUD RICH DOCUMENT LEVEL 02
 */

router.put('/:rest_id/grades/:score/recipes', async function (req, resp, next) {
  
  let id = req.params.rest_id;
  let score = Number(req.params.score);

  let results = await req.db.collection('restaurants')
  .update(
    {"grades.grade": "A+"},
    {$push: {"grades.$.recipes": req.body}},
    {multi: true}
    // {arrayFilters: [{"obj.score": score}]}
    );

  resp.json(results);
});

router.patch('/grades/:score/recipes/:cheff', async function (req, resp, next) {
  
  let score = Number(req.params.score);
  let cheff = req.params.cheff;

  let results = await req.db.collection('restaurants')
  .update(
    {},
    {$set: {"grades.$[grade].recipes.$[recipe].name": "I did it..."}},
    {arrayFilters: [{"grade.score": score}, {"recipe.cheff": cheff}], multi: true}
  );

  resp.json(results);
});

router.delete('/grades/recipes/:cheff', async function (req, resp, next) {
  let cheff = req.params.cheff

  let results = await req.db.collection('restaurants')
  .updateOne(
    { "grades.recipes.cheff" : cheff.toString() }, 
    {$pull: { "grades.$.recipes": { "cheff": cheff.toString()}} }
    );

    console.log(cheff.toString());
  resp.json(results);
});

module.exports = router;
