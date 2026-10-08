import express from 'express';
import Achievement from '../models/Achievement';
import User from '../models/User';
import { updateUserRankPoints } from '../utils/rankingLogic';

const router = express.Router();

// Add Achievement
router.post('/', async (req, res) => {
  try {
    const { userId, title, type, level, position, date, proofUrl } = req.body;

    const newAchievement = new Achievement({
      user: userId,
      title,
      type,
      level,
      position,
      date,
      proofUrl,
      status: 'Pending' // Default status
    });

    await newAchievement.save();

    // Update user rank points automatically
    await updateUserRankPoints(userId);

    res.status(201).json({ message: 'Achievement added successfully', achievement: newAchievement });
  } catch (error) {
    console.error('Error adding achievement:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Achievements
router.get('/user/:userId', async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.params.userId }).sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Leaderboard (Top Ranked Students)
router.get('/leaderboard', async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ rankPoints: -1 })
      .limit(10)
      .select('name branch year rankPoints avatar badges');
    
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
