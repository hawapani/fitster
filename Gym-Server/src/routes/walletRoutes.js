const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Wallet = mongoose.model('Wallet');

const router = express.Router();

router.use(requireAuth);

router.get('/balance', async (req, res) => {
  const {ID} = req.body
  const walletBalance = await Wallet.findOne({ userId: req.user._id });

  res.send(walletBalance);
});


router.post('/balance', async (req, res) => {
  const { newBalance } = req.body;
  const userId = req.user._id;


  if (!(newBalance||userId)) {
    return res
      .status(422)
      .send({ error: 'Data not provided' });
  }

  try {
    const updatedBalance = await Wallet.findOneAndUpdate(
      { userId: userId },
      { balance: newBalance },
      { new: true }
    );
    console.log(updatedBalance);

    if (!updatedBalance) {
      return res.status(404).send({ error: 'Wallet not found' });
    }

    res.send(updatedBalance);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post('/wallet', async (req, res) => {
    const userId = req.user._id;
    const exists = await Wallet.findOne({userId: userId});


    if (!userId) {
      return res
        .status(422)
        .send({ error: 'Data not provided' });
    }
  
    if (exists) {
        return res
            .status(422)
            .send({ error: 'Wallet already exists!' });
    } 

    
    try {
        const wallet = new Wallet({ userId: userId, balance: 0 });
        await wallet.save();
        res.send(wallet);  
    } catch (err) {
      res.status(422).send({ error: err.message });
    }

  });

router.post('/deleteWallet', async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        return res
        .status(422)
        .send({ error: 'Data not provided' });
    }

    try {
        const deletionResult = await Wallet.deleteOne({ userId: userId });
        if (deletionResult.deletedCount === 0) {
        return res.status(404).send({ error: 'Wallet not found' });
        }

        res.send({ message: 'Wallet deleted successfully' });

    } catch (err) {
        res.status(422).send({ error: err.message });
}
});

  
module.exports = router;
