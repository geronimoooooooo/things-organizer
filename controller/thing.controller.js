const {categoryList} = require('../util/resourceLists')
const Thing = require('../models/Thing.models.js');
const Category = require('../models/Category.models.js');
const Location = require('../models/Location.models.js');


function mwForThing(req, res, next){
    console.log('Middleware for /things');
    next();
}

async function addThing(req, res) {
    const {name, cat, loc} = req.query;
    let category;
    let location;
    
    try {
      category = await Category.findOne({name: cat});
      if(!category){
        category = await Category.create({id: 44, name: 'tools'});
        await category.save();
      }

      location = await Location.findOne({name: loc});
      if(!location){
        location = await Location.create({id: 3, name: 'garage'});
        await location.save();
      }
      
    } catch (err) {
      if (err.name === 'CastError') {
        console.error('Invalid ID');
      } else {
        console.error(err);
      }
    }
    const thing = await Thing.create({id: 1, name: 'newThing', category: category._id, location: location._id});
    await thing.save();
    
    category.things.push(thing);
    
    
    // const task1 = await Task4.create({ description: 'Finish homework2', category: user._id });
    // const task2 = await Task4.create({ description: 'Buy groceries', user: user._id });
    // category.tasks.push(task1, task2);
    await category.save();
    console.log(await category.populate('things'));
    res.json(thing)
    // console.dir(user, { depth: null })
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

  async function readThingByName(req, res) {
    const {name} = req.query;
    if(!name){
        return res.status(500).json({ message: `name: ${name} No specific resource selected, all will be displayed.`, resourceList: await readAllThings2() });  // Handle errors  
    }
    try {       
      const thing = await Thing.findOne({ name: name}).populate('category').populate('location');
      if (!thing) {
        return res.status(404).json({ message: `Thing  ${name} not found` }); // Return 404 if not found
      }
      res.json(thing);  // Return the Mongoose object as JSON
    } catch (error) {
      res.status(500).json({ message: 'No specific resource selected, all will be displayed.', resourceList: await readAllThings2() });  // Handle errors
    }
  };

async function readAllThings2 (req, res){   
    const result = await Thing.find().exec(); 
    return result;
}

async function readAllThings (req, res){   
    const result = await Thing.find()
    .populate({ path: 'category',   select: '-things -id',
        populate: {
          path: 'location',
          select: 'name'  // Optionally, select specific fields from category
                
         }
      }).exec();  
    res.json(result);
}


async function deleteThingByName(req, res){
    try {
        const thing = await Thing.findOneAndDelete({name: 'Banana'})
        if(!thing){
            return res.status(404).json({msg: `Could not delete ${req.params.id}`});
        }
        res.status(200).json(thing);
    } catch (error) {
        res.status(500).json({msg: `Could not delete ${req.params.id}`});
    }
}

module.exports = {
    mwForThing,
    addThing,
    readThingById, readThingByName, readAllThings,
    deleteThingByName
}