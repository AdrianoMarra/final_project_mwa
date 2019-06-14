var express = require('express');
var router = express.Router();

/* GET all locations. */
router.get('/:category', async function (req, res, next) {

  let locationQuery = {
    "location": {
      $near: {
        $geometry: { "coordinates": [-91.9665342, 41.017654] },
        $maxDistance: 2000
      }
    }
  };

  let categoryQuery = {
    "category": req.params.category
  }

  let nameQuery = (req.query.name) ? {"name": req.query.name} : {}

  let results = await db.collection("mum_locations")
    .find({
      $and: [
        locationQuery,
        categoryQuery,
        nameQuery 
      ]
    })
    .limit(3)
    .toArray();

  res.json(results);
});

/* POST a new location. */
router.post('/', async function (req, res, next) {

  let results = await db.collection("mum_locations")
    .insertMany(req.body)

  res.json(results);
});

module.exports = router;
