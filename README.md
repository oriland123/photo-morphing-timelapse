# 🎬 Photo Morphing Timelapse Creator

Create smooth, realistic morphing timelapse videos from photo sequences.

## ✨ Features

✅ Upload multiple photos  
✅ Arrange photos in custom order (Drag & Drop)  
✅ Smooth morphing transitions between photos  
✅ Realistic timelapse video generation  
✅ Download your created video  

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- FFmpeg installed on your system

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/oriland123/photo-morphing-timelapse.git
cd photo-morphing-timelapse
```

2. **Install Backend dependencies:**
```bash
npm install
```

3. **Install Frontend dependencies:**
```bash
cd client
npm install
cd ..
```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
npm start
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend React App:**
```bash
cd client
npm start
```
App will open at `http://localhost:3000`

## 📸 How to Use

1. **Upload Photos** - Click "Upload Photos" and select your images (2+ photos)
2. **Arrange Order** - Drag and drop to arrange photos in the desired sequence
3. **Preview** - See a preview of your photo sequence
4. **Create Video** - Click "Create Video" to generate the morphing timelapse
5. **Download** - Download your video once it's ready!

## 🎨 Morphing Features

- **Smooth Transitions** - OpenCV-based morphing for realistic transitions
- **Customizable Speed** - Adjust FPS and transition duration
- **High Quality** - Export in 1080p or 4K

## 🛠️ Tech Stack

- **Frontend:** React, Drag & Drop, Canvas API
- **Backend:** Node.js, Express, Multer
- **Video Processing:** FFmpeg, OpenCV, Sharp
- **Animation:** CSS transitions & Canvas

## 📝 License

MIT
