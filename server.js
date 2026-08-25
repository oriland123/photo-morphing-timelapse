const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
app.post('/api/upload', upload.array('photos', 50), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const files = req.files.map(file => ({
    filename: file.filename,
    path: file.path,
    originalName: file.originalname
  }));

  res.json({
    success: true,
    files: files,
    message: `${files.length} photos uploaded successfully`
  });
});

app.post('/api/create-video', (req, res) => {
  const { photos, fps = 30, transitionDuration = 2 } = req.body;
  
  if (!photos || photos.length < 2) {
    return res.status(400).json({ error: 'At least 2 photos required' });
  }

  res.json({
    success: true,
    message: 'Video creation started',
    videoId: Date.now()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

app.listen(PORT, () => {
  console.log(`🎬 Photo Morphing Server running on http://localhost:${PORT}`);
});
