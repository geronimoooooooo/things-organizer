
const {categoryList} = require('../util/resourceLists')
const Thing = require('../models/Thing.models.js');
const Category = require('../models/Category.models.js');
const Location = require('../models/Location.models.js');

let resourceList = categoryList;

const mwForCategory = (req, res, next) => {
    console.log('Middleware for /category');
    next();
};



async function createThingCategory(req, res) {
    try {        
        // const category = await Category.create({id: 44, name: 'Garage'});
        const category = await Category.create({id: 44, name: 'food'});
        // const thing = await Thing.create({id: 1, name: 'CDs', category: category._id});
        const thing1 = await Thing.create({id: 1, name: 'Banana', category: category._id});
        const thing2 = await Thing.create({id: 2, name: 'Banana2', category: category._id});
        const location = await Location.create({id: 1, name: 'blue chest', category: category._id})
        
        category.things.push(thing1, thing2);
        category.location.push(location);
        await category.save();

        console.log(category);
        return res.status(201).json(category);
    } catch (error) {
        res.status(500).json({msg: 'Could not create!'});
    }
}

    
async function getCategoryIdByName(catName) {
    const category = await Category.findOne({ name: catName });
    return category._id;
  }

async function readAllCategories (req, res){   
    const result = await Category.find().
        populate({ path: 'things',
        // populate: {
        //   path: 'category',
        //   //select: 'name'  // Optionally, select specific fields from category
        // //   select: '-things -id'
        //     populate: {
        //         path: 'things'
        //     }
        // }
      }).populate('location').exec();  
    return result;
}

async function readCategoryById(req, res){
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

async function readCategoryByName(req, res) {
    const {name} = req.query;
    if(!name){
        return res.status(500).json({ message: `name: ${name} No specific resource selected, all will be displayed.`, resourceList: await readAllCategories() });  // Handle errors  
    }
    try {       
      const category = await Category.findOne({ name: name}).populate('things');
      if (!category) {
        return res.status(404).json({ message: `Category  ${name} not found` }); // Return 404 if not found
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

module.exports = {
    mwForCategory, 
    createThingCategory, 
    readAllCategories, readCategoryByName, readCategoryById,  
    deleteCategoryById, deleteCatById,    
};