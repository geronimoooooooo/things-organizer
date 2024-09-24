const mongoose = require('mongoose');
const Category = require('./Category.models.js');


const ThingSchema = new mongoose.Schema({
  id: {
    type: Number    
  },
  name: {
    type: String,
  },
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

const ThingModel = mongoose.model("Thing", ThingSchema);
// export default CategoryModel;
module.exports = ThingModel;