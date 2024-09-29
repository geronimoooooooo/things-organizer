const mongoose = require('mongoose');
const Thing = require('./Thing.models.js');
const Category = require('./Category.models.js');


const LocationSchema = new mongoose.Schema({
  id: {
    type: Number    
  },
  name: {
    type: String,
  },
  things: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thing" }],
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] 
});

const LocationModel = mongoose.model("Location", LocationSchema);
// export default CategoryModel;
module.exports = LocationModel;