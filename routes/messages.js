const express = require('express');
const router = express.Router();
const Message = require('../models/Message')

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch(err) {
    res.json({ message: err });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.json(message);
  } catch(err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const message = new Message({
    author: req.body.author,
    message: req.body.message
  });

  try {
    const savedMessage = await message.save();
    res.json(savedMessage);
  } catch(err) {
    res.json({ message: err });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedMessage = await Message.updateOne({ _id: req.params.id }, { $set: {
      author: req.body.author,
      message: req.body.message,
    }})

    res.json(updatedMessage);
  } catch(err) {
    res.json({ message: err });
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const removedMessage = await Message.remove({ _id: req.params.id });
    res.json(removedMessage);
  } catch(err) {
    res.json({ message: err });
  }
});

module.exports = router;
