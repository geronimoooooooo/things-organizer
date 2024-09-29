const express = require('express');
const { AbilityBuilder } = require('casl');

const app = express();

// Define abilities for different roles
const adminAbility = AbilityBuilder.define((can, cannot) => {
  can('manage', 'all'); // admin can manage all resources
});

const moderatorAbility = AbilityBuilder.define((can, cannot) => {
  can('read', 'all'); // moderator can read all resources
  can('update', 'Comment'); // moderator can update comments
});

const userAbility = AbilityBuilder.define((can, cannot) => {
  can('read', 'Article'); // user can read articles
});

// Define a middleware to check permissions
const checkPermissions = (ability) => {
  return (req, res, next) => {
    const { action, subject } = req.params;
    if (ability.can(action, subject)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
};

// Define routes
app.get('/articles', checkPermissions(userAbility), (req, res) => {
  res.send('List of articles');
});

app.get('/articles/:id', checkPermissions(userAbility), (req, res) => {
  res.send(`Article ${req.params.id}`);
});

app.put('/articles/:id', checkPermissions(moderatorAbility), (req, res) => {
  res.send(`Updated article ${req.params.id}`);
});

app.delete('/articles/:id', checkPermissions(adminAbility), (req, res) => {
  res.send(`Deleted article ${req.params.id}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});