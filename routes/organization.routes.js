const express = require('express');
const app = express.Router();
const organizationController = require('../controller/organization.controller')


app.get('/', (req, res, next) => {
    console.log('Middleware for /organization');
    next();
});

// CRUD
/*Creates and adds new organization to the db. Things, locations, and categories are also created.*/
app.get('/add-organization', organizationController.createOrganization)
//read specific /category/id/1
app.get('/id/:id', (req, res) => {
    const resourceId = parseInt(req.params.id);
    const resource = resourceList.find((r) => r.id === resourceId);

    if (resource) {
        res.json(resource);
    } else {
        res.status(404).json({ error: 'Resource not found' });
    }
});

// GET method to handle /category and read query "name" /category?name=abc
app.get('/', organizationController.readOrganizationByName);
app.get('/all', organizationController.readAllOrganizations);

module.exports = app;
