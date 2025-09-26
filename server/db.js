const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/footballDB')
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); 
  });

module.exports = mongoose;
