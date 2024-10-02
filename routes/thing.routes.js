const express = require('express');
const thingController = require('../controller/thing.controller')
const app = express.Router();

let resourceList = [{ id: 1, name: 'Bohrer' }, { id: 2, name: 'Comics X-Men' }];

// CRUD

//read all
// app.get('/', thingController.mwForThing);
app.use(thingController.mwForThing); //executed everytime url starts with /thing


// GET method to handle /category and read query "name" /category?name=abc
app.get('/', thingController.readThingByName);
app.get('/all', thingController.readAllThings);
app.get('/add', thingController.addThing);

app.get('/delete',thingController.deleteThingByName);
app.get('/:id', thingController.readThingById); //must be last endpoint

module.exports = app;