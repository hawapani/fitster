const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: String,
  balance: Number
});

mongoose.model('Wallet', walletSchema);