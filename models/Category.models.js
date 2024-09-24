const mongoose = require('mongoose');
const Thing = require('./Thing.models.js');


const CategorySchema = new mongoose.Schema({
  id: {
    type: Number    
  },
  name: {
    type: String,
  },
  things: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thing"
 }]
 
});

const CategoryModel = mongoose.model("Category", CategorySchema);
// export default CategoryModel;
module.exports = CategoryModel;