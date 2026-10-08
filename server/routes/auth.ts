import express from 'express';
import User from '../models/User';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, applicationId, branch, year, section, rollNumber } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    // Note: In a real app, password should be hashed here using bcrypt
    const newUser = new User({
      name,
      email,
      password, // TODO: Hash password
      applicationId,
      branch,
      year,
      section,
      rollNumber,
      rankPoints: 0,
      badges: [],
      connections: [],
      pendingRequests: []
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (simple comparison for now, should use bcrypt.compare)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return user info (excluding password)
    const userResponse = user.toObject();
    // @ts-ignore
    delete userResponse.password;

    res.json({ message: 'Login successful', user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get User Profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
