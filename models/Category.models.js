const mongoose = require('mongoose');
const Thing = require('./Thing.models.js');
const Location = require('./Location.models.js');


const CategorySchema = new mongoose.Schema({
  id: {
    type: Number    
  },
  name: {
    type: String,
  },
  things: [{  type: mongoose.Schema.Types.ObjectId,  ref: "Thing" }],
  location: [{  type: mongoose.Schema.Types.ObjectId,  ref: "Location" }]
 
});

const CategoryModel = mongoose.model("Category", CategorySchema);
// export default CategoryModel;
module.exports = CategoryModel;