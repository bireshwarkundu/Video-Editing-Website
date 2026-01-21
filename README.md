# Pro Web Video Editor

A powerful web-based video editor built with the **MERN Stack** (MongoDB, Express, React, Node.js). It supports multi-track editing, real-time effects, and project persistence.

## 🚀 Capabilities

- **Multi-Track Timeline**: Edit video and audio on separate tracks (V1, A1).
- **Real-Time Effects**: Adjust **Brightness**, **Contrast**, and **Volume** with instant preview.
- **Media Library**: Import local video files (MP4, WebM) directly into your browser.
- **Project Persistence**: Auto-save your timeline state to the database.
- **Zero-Config Database**: Automatically falls back to an **In-Memory** database if MongoDB is not installed locally.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Zustand (State Management), Tailwind CSS.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose) / MongoMemoryServer.

## 📦 Installation & Running

### Prerequisites
- Node.js (v14 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/bireshwarkundu/Video-Editing-Website.git
cd Video-Editing-Website
```

### 2. Setup Backend
```bash
cd backend
npm install
node server.js
```
*The backend runs on `http://localhost:5001`.*

### 3. Setup Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*The frontend runs on `http://localhost:5173`.*

## 🎮 How to Use

1.  Open the App at `http://localhost:5173`.
2.  Click **Create New Project**.
3.  **Import Media**: In the left sidebar, click `+ Import` and select a video file.
4.  **Add to Timeline**: Hover over the imported clip and click `Add`.
5.  **Edit**: Click the blue clip in the timeline (bottom) to select it.
6.  **Adjust Effects**: Use the **Inspector** (right sidebar) to change brightness or volume.
7.  **Preview**: Watch the changes live in the center Player.
8.  **Save**: Click `Save` in the top right corner.

## 📝 License
This project is open source.
