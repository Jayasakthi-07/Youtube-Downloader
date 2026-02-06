# 🌀 Vortex Downloader
### *Premium 4K Video & Audio Downloader*

![Vortex Banner](https://img.shields.io/badge/Vortex-Downloader-cyan?style=for-the-badge&logo=youtube&logoColor=white) 
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

**Vortex Downloader** is a next-generation media tool built for speed and quality. It combines a stunning **Cyberpunk/Glassmorphism UI** with a powerful backend capable of **4K/8K Video Downloads**, **320kbps Audio Extraction**, and **Batch Playlist Processing**.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🎥 Extreme Quality** | Download videos in crystal clear **4K, 8K, and 60FPS**. |
| **🎵 Hi-Fi Audio** | Auto-installs **320kbps MP3s** for the best listening experience. |
| **📑 Playlist Support** | Paste a playlist URL to browse and bulk download tracks. |
| **🎨 Modern UI** | A beautiful "Vortex" interface with dynamic glowing backgrounds. |
| **⚡ Real-Time** | Live progress bars and speed tracking via WebSockets. |
| **📱 Mobile Ready** | Use it on your **Phone or Tablet** via your local Wi-Fi. |

---

## 🛠️ Tech Stack

*   **Frontend**: [Next.js 15](https://nextjs.org/) • TypeScript • TailwindCSS • Shadcn UI
*   **Backend**: [FastAPI](https://fastapi.tiangolo.com/) • Python 3.10+ • `yt-dlp`
*   **Core**: FFmpeg (Media Processing)

---

## 📋 Prerequisites

Before you start, you need three things installed looking like this:

1.  **Python 3.10+**: [Download Python](https://www.python.org/downloads/)
    *   ⚠️ **IMPORTANT:** During installation, check the box **"Add Python to PATH"**.
2.  **Node.js 18+**: [Download Node.js](https://nodejs.org/)
3.  **FFmpeg**: (See the detailed guide below)

---

## 🛑 How to Install FFmpeg (Crucial Step)

**FFmpeg** is the engine that merges video and audio. Without it, you cannot download high-quality 1080p/4K videos.

### 🪟 For Windows Users (Beginner Friendly)

1.  **Download**: Go to [gyan.dev/ffmpeg/builds](https://www.gyan.dev/ffmpeg/builds/) and download `ffmpeg-git-full.7z`.
2.  **Extract**: Extract the folder (using 7-Zip or WinRAR). Rename the extracted folder to just `ffmpeg`.
3.  **Move**: Move the `ffmpeg` folder to your C: drive directly (e.g., `C:\ffmpeg`).
4.  **Add to PATH**:
    *   Press `Win + S` and search for **"Edit the system environment variables"**.
    *   Click **Environment Variables** button.
    *   In the **System variables** section (bottom box), find and select **Path**, then click **Edit**.
    *   Click **New** and type: `C:\ffmpeg\bin`
    *   Click **OK** on all windows to save.
5.  **Verify**: Open a new Command Prompt (CMD) and type `ffmpeg -version`. If you see version info, you did it! 🎉

### 🍎 For Mac Users
```bash
brew install ffmpeg
```

### 🐧 For Linux Users
```bash
sudo apt update && sudo apt install ffmpeg
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Jayasakthi-07/Youtube-Downloader.git
cd Youtube-Downloader
```

### 2. Backend Setup
Typically takes 2 minutes.

```bash
cd backend
# Create virtual environment
python -m venv venv
# Activate it (Windows)
.\venv\Scripts\activate
# Install requirements
pip install -r requirements.txt
```

### 3. Frontend Setup
Typically takes 2 minutes.

```bash
cd frontend
npm install
```

---

## ⚡ How to Run

Open **two separate terminals** (Command Prompts) to run the app.

### Terminal 1: The Backend 🧠
```bash
cd backend
.\venv\Scripts\activate
# Start Server (Accessible on Network)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*You should see: `Uvicorn running on http://0.0.0.0:8000`*

### Terminal 2: The Frontend 🎨
```bash
cd frontend
# Start UI (Accessible on Network)
npm run dev
```
*You should see: `Ready in 3000`*

---

## 📱 How to Use on Mobile (Wi-Fi)

Want to download directly to your phone?

1.  Find your PC's **IPv4 Address**:
    *   Open CMD and type `ipconfig`.
    *   Look for `IPv4 Address` (e.g., `192.168.1.5`).
2.  Open your Phone's Browser (Chrome/Safari).
3.  Type: `http://192.168.1.5:3000` (Replace with your IP).
4.  That's it! The app works perfectly on mobile.

---

## 🐳 Docker Support (One-Click Run)

If you have Docker installed, you can skip all the setup steps!

1.  **Run**:
    ```bash
    docker-compose up --build
    ```
2.  **Open**: Go to `http://localhost:3000`.

---

## 🧩 Usage Guide

1.  **Paste URL**: Copy a link from YouTube (Video or Playlist).
2.  **Analyze**: Paste it in the Vortex search bar.
3.  **Choose Quality**:
    *   **Video Tab**: Select 4K, 1080p, or 720p.
    *   **Audio Tab**: Select "Ultra High (320kbps)".
4.  **Download**: Click the button and watch the magic happen.

---

## ⚠️ Disclaimer
*This project is for educational purposes. Please respect YouTube's Terms of Service and content creators' rights. Do not download copyrighted materials without permission.*

---

<p align="center">
  Made with ❤️ by <b>Jayasakthi-07</b>
</p>
