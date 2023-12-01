const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  gymId: String,
  startTime: Number,
  stopTime: Number
});

mongoose.model('Session', sessionSchema);