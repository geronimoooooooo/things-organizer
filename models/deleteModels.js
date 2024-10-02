const mongoose = require('mongoose');

const deleteContentFromCollections = async (req, res) => {
    // List of collection names you want to drop
    const collectionsToDrop = ['articles', 'categories', 'locations', 'things', 'organizations'];
    try {
      for (const collectionName of collectionsToDrop) {
        if (mongoose.connection.collections[collectionName]) {
          await mongoose.connection.collections[collectionName].drop();
          console.log(`Dropped collection: ${collectionName}`);
          res.write(`Dropped collection: ${collectionName}\n`)
        } else {
          console.log(`Collection ${collectionName} not found.`);
          res.write(`Collection ${collectionName} not found.\n`);
        }
      }
     
    } catch (err) {
      console.error('Error dropping collections:', err);
    }
    res.status(200).end('task finished.');
  };

module.exports = {deleteContentFromCollections}