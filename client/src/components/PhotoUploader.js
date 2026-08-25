import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './PhotoUploader.css';

const PhotoUploader = ({ onPhotosUploaded }) => {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length < 2) {
      setError('Please upload at least 2 photos');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('photos', file);
    });

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        onPhotosUploaded(response.data.files);
      }
    } catch (err) {
      setError('Failed to upload photos. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }, [onPhotosUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  });

  return (
    <div className="photo-uploader">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="uploading-content">
            <div className="spinner"></div>
            <p>Uploading your photos...</p>
          </div>
        ) : isDragActive ? (
          <div className="dropzone-content">
            <p className="emoji">📸</p>
            <p>Drop your photos here!</p>
          </div>
        ) : (
          <div className="dropzone-content">
            <p className="emoji">📁</p>
            <p className="main-text">Drag and drop your photos here</p>
            <p className="sub-text">or click to select files</p>
            <p className="hint">📌 Upload at least 2 photos (JPG, PNG, GIF, WebP)</p>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PhotoUploader;
