import React, { useState } from 'react';
import './App.css';
import PhotoUploader from './components/PhotoUploader';
import PhotoOrganizer from './components/PhotoOrganizer';
import VideoCreator from './components/VideoCreator';

function App() {
  const [photos, setPhotos] = useState([]);
  const [step, setStep] = useState('upload'); // 'upload', 'organize', 'create'
  const [videoCreating, setVideoCreating] = useState(false);

  const handlePhotosUploaded = (uploadedPhotos) => {
    setPhotos(uploadedPhotos);
    setStep('organize');
  };

  const handlePhotosReordered = (reorderedPhotos) => {
    setPhotos(reorderedPhotos);
  };

  const handleCreateVideo = () => {
    setStep('create');
    setVideoCreating(true);
  };

  const handleVideoComplete = () => {
    setVideoCreating(false);
    setPhotos([]);
    setStep('upload');
  };

  const handleReset = () => {
    setPhotos([]);
    setStep('upload');
    setVideoCreating(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎬 Photo Morphing Timelapse Creator</h1>
        <p>Create smooth, realistic morphing videos from your photo sequences</p>
      </header>

      <main className="app-main">
        {step === 'upload' && (
          <PhotoUploader onPhotosUploaded={handlePhotosUploaded} />
        )}

        {step === 'organize' && photos.length > 0 && (
          <PhotoOrganizer 
            photos={photos}
            onPhotosReordered={handlePhotosReordered}
            onCreateVideo={handleCreateVideo}
            onReset={handleReset}
          />
        )}

        {step === 'create' && photos.length > 0 && (
          <VideoCreator 
            photos={photos}
            onVideoComplete={handleVideoComplete}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>✨ Create amazing timelapse videos with smooth morphing transitions</p>
      </footer>
    </div>
  );
}

export default App;
