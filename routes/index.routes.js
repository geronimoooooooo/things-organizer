const express = require('express');
const router = express.Router();

let tasks = [];

router.get('/', (req, res) => {    
   res.send('');  
})

router.post('/add', (req, res) => {
    const {task} = req.body;
    tasks.push(task);
    res.redirect('/todo');
});

module.exports = router;