const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  gymId: String,
  perMinCharge: Number
});

mongoose.model('Price', priceSchema);