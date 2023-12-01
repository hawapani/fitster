const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Price = mongoose.model('Price');

const router = express.Router();

router.use(requireAuth);

router.get('/price', async (req, res) => {
  const {ID} = req.body
  const priceObject = await Price.findOne({ gymId: ID });
  res.send(priceObject);
});

router.get('/priceList', async (req, res) => {
  const priceList = await Price.find();
  res.send(priceList);
});



router.post('/price', async (req, res) => {
  const { perMinuteCharge, ID } = req.body;

  if (!(ID||perMinuteCharge)) {
    return res
      .status(422)
      .send({ error: 'Data not provided' });
  }

  try {
    const price = new Price({ perMinCharge: perMinuteCharge, gymId: ID });
    await price.save();
    res.send(price);
  }
   catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
