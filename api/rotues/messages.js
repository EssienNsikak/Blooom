const router = require('express').Router();
const Message = require('../models/Message');

// Create a new message
router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    return res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all messages in a conversation
router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    });
    return res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;