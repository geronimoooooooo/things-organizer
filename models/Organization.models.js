const mongoose = require('mongoose');
const Category = require('./Category.models.js');
const Location = require('./Location.models.js');
const Thing = require('./Thing.models.js');

const OrganizationSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
    },
    things: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thing" }],
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

const OrganizationModel = mongoose.model("Organization", OrganizationSchema);
// export default CategoryModel;
module.exports = OrganizationModel;