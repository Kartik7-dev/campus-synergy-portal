import express from 'express';
import Conversation from '../models/Conversation';
import User from '../models/User';

const router = express.Router();

// Send Message
router.post('/message', async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    // Check if conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      // Create new conversation
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    // Add message
    conversation.messages.push({
      senderId: senderId,
      text,
      timestamp: new Date(),
      isRead: false
    });

    // Update last updated timestamp
    // @ts-ignore - Mongoose handles this but TS might complain about custom fields if not in interface explicitly
    conversation.updatedAt = new Date();

    await conversation.save();
    res.status(201).json({ message: 'Message sent', conversation });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Conversation between two users
router.get('/:userId/:otherUserId', async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] }
    }).populate('messages.senderId', 'name avatar');

    if (!conversation) {
      return res.json({ messages: [] });
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User's Conversations (List of chats)
router.get('/user/:userId', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.params.userId
    })
    .populate('participants', 'name avatar')
    .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
