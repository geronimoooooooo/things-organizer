const deleteContentFromCollections = async () => {
  // List of collection names you want to drop
  const collectionsToDrop = ['post4', 'task4', 'user4'];
  try {
    for (const collectionName of collectionsToDrop) {
      if (mongoose.connection.collections[collectionName]) {
        await mongoose.connection.collections[collectionName].drop();
        console.log(`Dropped collection: ${collectionName}`);
      } else {
        console.log(`Collection ${collectionName} not found.`);
      }
    }
  } catch (err) {
    console.error('Error dropping collections:', err);
  }
};

async function dropCollections(){  
  User4.collection.drop((err, result) => {
    if (err) {
        console.error('Error dropping collection:', err);
    } else {
        console.log('Collection dropped:', result);
    }
  });
}