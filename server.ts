import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import path from 'path';

// Load environment variables
dotenv.config();

// Import Routes
import authRoutes from './server/routes/auth';
import achievementRoutes from './server/routes/achievements';
import adminRoutes from './server/routes/admin';
import chatRoutes from './server/routes/chat';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // MongoDB Connection
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-synergy';

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.send('Campus Synergy API is running');
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/achievements', achievementRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/chat', chatRoutes);

  // Vite Middleware (for development)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start Server
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Import Models (to ensure they are registered)
import './server/models/User';
import './server/models/Achievement';
import './server/models/AdminRequest';
import './server/models/Conversation';

startServer();
