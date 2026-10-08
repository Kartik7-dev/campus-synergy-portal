import express from 'express';
import AdminRequest from '../models/AdminRequest';

const router = express.Router();

// Create Admin Request
router.post('/', async (req, res) => {
  try {
    const { userId, type, details, documentUrl } = req.body;

    const newRequest = new AdminRequest({
      user: userId,
      type,
      status: 'Submitted',
      uploadedDocUrl: documentUrl,
      timeline: [
        {
          status: 'Submitted',
          timestamp: new Date(),
          remark: 'Request submitted'
        }
      ]
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Requests
router.get('/user/:userId', async (req, res) => {
  try {
    const requests = await AdminRequest.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Request Status (Admin only - simplified for now)
router.patch('/:requestId/status', async (req, res) => {
  try {
    const { status, note } = req.body;
    const request = await AdminRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    request.timeline.push({
      status,
      timestamp: new Date(),
      remark: note || `Status updated to ${status}`
    });

    await request.save();
    res.json({ message: 'Status updated', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
