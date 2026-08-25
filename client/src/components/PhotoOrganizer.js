import React, { useState } from 'react';
import './PhotoOrganizer.css';

const PhotoOrganizer = ({ photos, onPhotosReordered, onCreateVideo, onReset }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [localPhotos, setLocalPhotos] = useState(photos);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newPhotos = [...localPhotos];
    const draggedPhoto = newPhotos[draggedItem];
    
    newPhotos.splice(draggedItem, 1);
    newPhotos.splice(dropIndex, 0, draggedPhoto);
    
    setLocalPhotos(newPhotos);
    onPhotosReordered(newPhotos);
    setDraggedItem(null);
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = localPhotos.filter((_, i) => i !== index);
    setLocalPhotos(newPhotos);
    onPhotosReordered(newPhotos);
  };

  return (
    <div className="photo-organizer">
      <div className="organizer-header">
        <h2>📋 Organize Your Photos</h2>
        <p>Drag and drop to arrange the order. This will be the sequence for your timelapse.</p>
      </div>

      <div className="photos-grid">
        {localPhotos.map((photo, index) => (
          <div
            key={index}
            className={`photo-card ${draggedItem === index ? 'dragging' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div className="photo-number">{index + 1}</div>
            <img
              src={`/uploads/${photo.filename}`}
              alt={`Photo ${index + 1}`}
              className="photo-preview"
            />
            <div className="photo-info">
              <p className="photo-name">{photo.originalName}</p>
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemovePhoto(index)}
              title="Remove this photo"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="organizer-actions">
        <button className="btn btn-secondary" onClick={onReset}>
          ← Back to Upload
        </button>
        <button className="btn btn-primary" onClick={onCreateVideo}>
          Create Video →
        </button>
      </div>
    </div>
  );
};

export default PhotoOrganizer;
