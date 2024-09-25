const {categoryList} = require('../util/resourceLists')
const Thing = require('../models/Thing.models.js');
const Category = require('../models/Category.models.js');


function mwForThing(req, res, next){
    console.log('Middleware for /things');
    next();
}

async function readThingById(req, res) {
    try {
      const thing = await Thing.findById(req.params.id).populate('category', '-things').exec();  // Find category by ID
      if (!thing) {
        return res.status(404).json({ message: 'thing not found' }); // Return 404 if not found
      }
      res.json(thing);  // Return the Mongoose object as JSON
    } catch (error) {
      res.status(500).json({ error: 'Server error' });  // Handle errors
    }
  }

module.exports = {
    mwForThing,
    readThingById
}