const Thing =           require('../models/Thing.models.js');
const Category =        require('../models/Category.models.js');
const Location =        require('../models/Location.models.js');
const Organization =    require('../models/Organization.models.js');

const mwForCategory = (req, res, next) => {
    console.log('Middleware for /category');
    next();
};

//CRUD
async function createOrganization(req, res) {
    try {        
        // const category = await Category.create({id: 44, name: 'Garage'});
        const organization = await Organization.create({id: 1, name: 'orga1'});
        // const thing = await Thing.create({id: 1, name: 'CDs', category: category._id});
        const thing = await Thing.create({id: 1, name: 'banana'});
        const thing2 = await Thing.create({id: 2, name: 'Banana2'});
        const thing3 = new Thing({
            id: 3,
            name: 'banana3'
        })
        const category = await Category.create({id: 1, name: 'food', things: [thing, thing2]});
        const location = await Location.create({id: 1, name: 'red chest', things: thing3});
        const location2 = await Location.create({id: 2, name: 'dach'});
        
        organization.things.push(thing, thing2);
        organization.location.push(location, location2);
        organization.category.push(category);
        organization.save();

        console.log(organization);
        return res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({msg: 'Could not create!'});
    }
}

async function readOrganizationByName(req, res) {
    const {name} = req.query;
    if(!name){
        return res.status(500).json({ message: `name: ${name}. No specific resource selected.` });  // Handle errors  
    }
    try {       
      const orga = await Organization.findOne({ name: name}).populate('things location category');
      if (!orga) {
        return res.status(404).json({ message: `Organization  ${name} not found` }); // Return 404 if not found
      }
      res.json(orga);  // Return the Mongoose object as JSON
    } catch (error) {
      res.status(500).json({ message: error.message });  // Handle errors
    }
};

async function readAllOrganizations(req, res){
    const orga = await Organization.find().populate('things location category', 'name');
    res.status(200).json(orga);
}

module.exports = { 
    createOrganization,
    readOrganizationByName, readAllOrganizations
 }

