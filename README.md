# Vortex Downloader 🚀

**Vortex Downloader** is a premium, high-performance YouTube Downloader built with a modern tech stack. It supports **4K Video Downloads**, **320kbps Audio Extraction**, **Playlist Support**, and features a stunning **Cyberpunk/Glassmorphism UI**.

![Vortex Downloader](https://i.imgur.com/placeholder-demo.png) 
*(Screenshots can be added here)*

## ✨ Features

- **Extreme Quality**: Download videos in **4K/8K** and audio in **320kbps MP3**.
- **Playlist Support**: Paste a playlist URL to batch download videos.
- **Modern UI**: A "Vortex" themed interface with dynamic backgrounds and glassmorphism.
- **Fast & Efficient**: Powered by `yt-dlp` for reliable extraction and `FFmpeg` for high-quality merging.
- **Real-time Progress**: Live progress bars using WebSockets/Polling.
- **Mobile Ready**: Fully responsive design that works on mobile devices over the local network.
- **Auto-Cleanup**: Automatically cleans up old files to save disk space.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14+](https://nextjs.org/), TypeScript, TailwindCSS, Shadcn UI.
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python), `yt-dlp`.
- **Media Processing**: [FFmpeg](https://ffmpeg.org/).

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

1.  **Python 3.10+**: [Download Here](https://www.python.org/downloads/)
    *   *Make sure to check "Add Python to PATH" during installation.*
2.  **Node.js 18+**: [Download Here](https://nodejs.org/)
3.  **FFmpeg**: [Download Here](https://ffmpeg.org/download.html)
    *   **Crucial**: You must add `ffmpeg/bin` to your System PATH so the downloader can merge video and audio.

---

## ⚙️ Installation Guide

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/Jayasakthi-07/Youtube-Downloader.git
cd Youtube-Downloader
```

### 2. Backend Setup
Navigate to the `backend` folder and set up the Python environment.

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```
*(Note: If `requirements.txt` is missing, install manually: `pip install fastapi uvicorn yt-dlp python-multipart types-requests`)*

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` folder, and install dependencies.

```bash
cd frontend
npm install
```

---

## 🚀 How to Run

You need to run the **Backend** and **Frontend** simultaneously in two separate terminals.

### Terminal 1: Start Backend
```bash
cd backend
.\venv\Scripts\activate
# Run the server (Hosts on 0.0.0.0 for network access)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*The backend will start at `http://localhost:8000`.*

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```
*The frontend will start at `http://localhost:3000`.*

---

## 📱 Using on Mobile (Local Network)

To access the downloader from your phone (connected to the same Wi-Fi):

1.  Find your PC's Local IP Address (e.g., `192.168.1.5`).
    *   *Windows*: Open CMD and type `ipconfig`. Look for "IPv4 Address".
2.  Open your phone's browser.
3.  Go to `http://<YOUR_IP>:3000` (e.g., `http://192.168.1.5:3000`).
4.  **Enjoy!** The app automatically connects to the backend and works just like on desktop.

---

## 🧩 Usage Instructions

1.  **Copy URL**: Copy a YouTube Video or Playlist URL.
2.  **Paste & Analyze**: Paste it into the input box and click "Analyze".
3.  **Select Format**:
    *   **Video**: Choose resolution (1080p, 4K, etc.).
    *   **Audio**: Choose quality (320kbps recommended).
4.  **Download**: Click the download button. The file will be processed and saved to your device.

---

## ⚠️ Legal Disclaimer
This tool is for personal use only. Users must respect YouTube's Terms of Service and copyright laws. Do not download copyrighted content without permission.

---

**Made with ❤️ by [Jayasakthi-07](https://github.com/Jayasakthi-07)**
