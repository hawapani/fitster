const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Session = mongoose.model('Session');

const router = express.Router();

router.use(requireAuth);

router.post('/startSession', async (req, res) => {
  const { scanTime, gymID } = req.body;

  if (!(gymID||scanTime)) {
    return res
      .status(422)
      .send({ error: 'Data not provided' });
  }

  try {
    const session = new Session({ startTime: scanTime, gymId: ID });
    await session.save();
    res.send(session);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});


router.post('/stopSession', async (req, res) => {
  const { scanTime, sessionID } = req.body;

  if (!(sessionID||scanTime)) {
    return res
      .status(422)
      .send({ error: 'Data not provided' });
  }

  try {
    const updatedSession = await Session.findByIdAndUpdate(
      sessionID,
      { stopTime: scanTime },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).send({ error: 'Session not found' });
    }

    res.send(updatedSession);

  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});


module.exports = router;
