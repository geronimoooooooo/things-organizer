
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

const readCatByName =  async  (req, res) => {
    const name = req.query.name; // Access the query parameter "name"

    if (name) {
        res.send(`Category name: ${name}`);
    } else {
        const result = await showCat();
        // res.json({ message: 'No specific resource selected, all will be displayed.', resourceList: resourceList });
        res.json({ message: 'No specific resource selected, all will be displayed.', resourceList: result  });
    }
};

const deleteCategoryById =  (req, res) => {
    const resourceId = parseInt(req.params.id);
    resourceList = resourceList.filter((r) => r.id !== resourceId);
    res.json({ message: 'Resource deleted successfully', resourceList: resourceList });
   };

   async function createThingCategory() {
    const category = await Category.create({id: 11, name: 'keller'});
    const thing = await Thing.create({id: 1, name: 'maschine', category: category._id});
    category.things.push(thing);
    await category.save();
    console.log(category);
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

const showCat = async (req, res)=>{    
    // const result = await addThingToCategory(await getCategoryIdByName('keller'));
    // console.log("aaaaa: "+result);

    const result = await Category.findOne({ name: 'keller' }).exec();
    console.log(result);
    res.json(await result.populate('things'));
}
module.exports = {mwForCategory, addCategory, readCatById, readCatByName, deleteCategoryById,
    createThingCategory, showCat
};