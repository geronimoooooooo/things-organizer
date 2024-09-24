const express = require('express');
const app = express.Router();

let resourceList = [{ id: 1, name: 'Bohrer' }, { id: 2, name: 'Comics X-Men' }];

// CRUD

//read all
app.get('/', (req, res, next) => {
    console.log('Middleware for /things');
    next();
});

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
app.get('/', (req, res) => {
    const name = req.query.name; // Access the query parameter "name"

    if (name) {
        res.send(`Thing name: ${name}`);
    } else {
        res.send('No Thing name provided. All will be displayed.');
    }
});

module.exports = app;