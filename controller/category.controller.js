
const {categoryList} = require('../util/resourceLists')
const Thing = require('../models/Thing.models.js');
const Category = require('../models/Category.models.js');

let resourceList = categoryList;

const mwForCategory = (req, res, next) => {
    console.log('Middleware for /category');
    next();
};

const addCategory = (req, res) => {
    // const newResource = req.body;
    const newResource = {id:3, name: 'cooking'}
    resourceList.push(newResource);
    res.status(201).json(newResource);
   };

const readCatById = (req, res) => {
    const resourceId = parseInt(req.params.id);
    const resource = resourceList.find((r) => r.id === resourceId);

    if (resource) {
        res.json(resource);
    } else {
        res.status(404).json({ error: 'Resource not found' });
    }
};

const readCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);  // Find category by ID
      if (!category) {
        return res.status(404).json({ message: 'Category not found' }); // Return 404 if not found
      }
      res.json(category);  // Return the Mongoose object as JSON
    } catch (error) {
      res.status(500).json({ error: 'Server error' });  // Handle errors
    }
  };

const readCatByName =  async  (req, res) => {
    const name = req.query.name; // Access the query parameter "name"

    if (name) {
        res.send(`Category name: ${name}`);
    } else {
        
        // res.json({ message: 'No specific resource selected, all will be displayed.', resourceList: resourceList });
        res.json({ message: 'No specific resource selected, all will be displayed.', resourceList: await readAllCategories()  });
    }
};

const readCategoryByName = async (req, res) => {
    const {name} = req.query;
    try {       
      const category = await Category.findOne({ name: name}).populate('things');
      if (!category) {
        return res.status(404).json({ message: 'Category not found' }); // Return 404 if not found
      }
      res.json(category);  // Return the Mongoose object as JSON
    } catch (error) {
      res.status(500).json({ message: 'No specific resource selected, all will be displayed.', resourceList: await readAllCategories() });  // Handle errors
    }
  };

const deleteCatById =  (req, res) => {
    const resourceId = parseInt(req.params.id);
    resourceList = resourceList.filter((r) => r.id !== resourceId);
    res.json({ message: 'Resource deleted successfully', resourceList: resourceList });
   };

async function deleteCategoryById(req, res){
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(404).json({msg: `Could not delete ${req.params.id}`});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({msg: `Could not delete ${req.params.id}`});
    }
}

async function createThingCategory(req, res) {
    try {        
        const category = await Category.create({id: 33, name: 'Garage'});
        const thing = await Thing.create({id: 1, name: 'CDs', category: category._id});
        category.things.push(thing);
        await category.save();
        console.log(category);
        return res.status(201).json(category);
    } catch (error) {
        res.status(500).json({msg: 'Could not create!'});
    }
  }

async function addThingToCategory(catId) {
    let category;
    try {
      category = await Category.findById(catId);
      console.log(category);
      return category;
    } catch (err) {
      if (err.name === 'CastError') {
        console.error('Invalid ID');
      } else {
        console.error(err);
      }
    }
    const thing = await Thing.create({id: 1, name: 'maschine', category: category._id});
    category.things.push(thing);
    await category.save();
    // const task1 = await Task4.create({ description: 'Finish homework2', category: user._id });
    // const task2 = await Task4.create({ description: 'Buy groceries', user: user._id });
    // category.tasks.push(task1, task2);
    await category.save();
    console.log(await category.populate('things'));
    return category.populate('things');
    // console.dir(user, { depth: null })
  }
  
async function getCategoryIdByName(catName) {
    const category = await Category.findOne({ name: catName });
    return category._id;
  }

async function readAllCategories (req, res){   
    const result = await Category.find().populate('things').exec();  
    return result;
}

module.exports = {
    mwForCategory, 
    addCategory, createThingCategory, 
    readAllCategories, readCategoryByName, readCategoryById, readCatById, readCatByName, 
    deleteCategoryById, deleteCatById,    
};