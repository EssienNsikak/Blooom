const router = require('express').Router();
const Conversation = require('../models/Conversation');

// Create a new conversation
router.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  });
  try {
    const savedConversation = await newConversation.save();
    return res.status(201).json(savedConversation);
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get conversation of a user
router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] }
    });
    return res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;