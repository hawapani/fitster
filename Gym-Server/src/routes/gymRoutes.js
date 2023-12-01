const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Gym = mongoose.model('Gym');

const router = express.Router();

router.use(requireAuth);

router.get('/gyms', async (req, res) => {
  const {ID} = req.body
  const gym = await Gym.find({ gymId: ID });

  res.send(gym);
});

router.get('/allGyms', async (req, res) => {
  const allGyms = await Gym.find();
  res.send(allGyms);
});

router.post('/gyms', async (req, res) => {
  const { result, ID } = req.body;

  if (!result) {
    return res
      .status(422)
      .send({ error: 'Data not provided' });
  }

  try {

    const gym = new Gym({ result: result, gymId: ID });
    await gym.save();
    res.send(gym);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
