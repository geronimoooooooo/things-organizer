const express = require('express');
const app = express.Router();
// const categoryController = require('../controller/category.controller')
const categoryController = require('../controller/category.controller');
const {categoryList} = require('../util/resourceLists')

const resourceList = categoryList;
// let resourceList = [{ id: 1, name: 'tools' }, { id: 2, name: 'books' }];



//read all
app.get('/', categoryController.mwForCategory);


//#region CRUD

//#region CREATE POST
// Create a new resource http://localhost:3000/api/resources
// app.get('/add-category', categoryController.addCategory);
app.get('/add-category', categoryController.createThingCategory);


//#endregion

//#region READ
//read specific /category/id/1
app.get('/id/:id', categoryController.readCatById);

// GET method to handle /category and read query "name" /category?name=abc
app.get('/', categoryController.readCatByName);
// app.get('/', categoryController.showCat);
//#endregion READ

//#region DELETE
// Delete a resource by ID http://localhost:3000/api/resources/:id
app.get('/delete/:id', categoryController.deleteCategoryById);
//#endregion DELETE
//#endregion CRUD


module.exports = app;