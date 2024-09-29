const express = require('express');
const router = express.Router();
const Thing =           require('../models/Thing.models.js');
const Category =        require('../models/Category.models.js');
const Location =        require('../models/Location.models.js');
const Organization =    require('../models/Organization.models.js');

let tasks = [];

router.get('/', (req, res) => {    
    console.log('some test');    
    res.render('todo', {tasks:tasks, date: new Date()});  
})

router.get('/f', async(req, res)=>{
    try {
        const doc = await Model.findOne({ _id: id });
        // handle document
      } catch (err) {
        // handle error
      }
});

router.post('/add', (req, res) => {
    const {task} = req.body;
    tasks.push(task);
    res.redirect('/todo');
});

module.exports = router;