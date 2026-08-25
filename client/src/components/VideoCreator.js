import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoCreator.css';

const VideoCreator = ({ photos, onVideoComplete, onReset }) => {
  const [creating, setCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [fps, setFps] = useState(30);
  const [transitionDuration, setTransitionDuration] = useState(2);
  const [quality, setQuality] = useState('1080p');

  useEffect(() => {
    createVideo();
  }, []);

  const createVideo = async () => {
    setCreating(true);
    setProgress(0);

    try {
      const payload = {
        photos: photos.map(p => p.filename),
        fps,
        transitionDuration,
        quality
      };

      // Simulate video creation with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setProgress(i);
      }

      const response = await axios.post('/api/create-video', payload);

      if (response.data.success) {
        setProgress(100);
        // In a real implementation, you'd get the actual video URL from the backend
        setVideoUrl(`/videos/timelapse-${response.data.videoId}.mp4`);
      }
    } catch (error) {
      console.error('Error creating video:', error);
      setProgress(0);
    } finally {
      setCreating(false);
    }
  };

  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'morphing-timelapse.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="video-creator">
      <div className="creator-header">
        <h2>🎬 Creating Your Video</h2>
      </div>

      <div className="creator-container">
        {creating && !videoUrl && (
          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">Processing: {progress}%</p>
            <p className="progress-hint">Creating smooth morphing transitions...</p>
          </div>
        )}

        {videoUrl && (
          <div className="video-complete">
            <div className="success-icon">✅</div>
            <h3>Video Created Successfully!</h3>
            <p>Your morphing timelapse video is ready</p>
            
            <div className="video-info">
              <div className="info-item">
                <span className="label">Photos:</span>
                <span className="value">{photos.length}</span>
              </div>
              <div className="info-item">
                <span className="label">FPS:</span>
                <span className="value">{fps}</span>
              </div>
              <div className="info-item">
                <span className="label">Transition:</span>
                <span className="value">{transitionDuration}s</span>
              </div>
              <div className="info-item">
                <span className="label">Quality:</span>
                <span className="value">{quality}</span>
              </div>
            </div>

            <button className="btn btn-download" onClick={handleDownload}>
              ⬇️ Download Video
            </button>
          </div>
        )}
      </div>

      {videoUrl && (
        <div className="creator-actions">
          <button className="btn btn-secondary" onClick={onReset}>
            ↻ Create Another
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCreator;
