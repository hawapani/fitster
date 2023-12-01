const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
  gymId: {
    type: String
  },
  result: {
    type: Object
  }
});

mongoose.model('Gym', gymSchema);