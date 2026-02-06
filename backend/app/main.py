from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title="YouTube Downloader API",
    description="High-performance YouTube Downloader Backend using yt-dlp",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    import asyncio
    from app.core.config import get_settings
    import os
    import time
    
    settings = get_settings()
    
    async def cleanup_loop():
        while True:
            try:
                # Cleanup files older than 1 hour
                download_dir = settings.DOWNLOAD_DIR
                if os.path.exists(download_dir):
                    now = time.time()
                    for f in os.listdir(download_dir):
                        f_path = os.path.join(download_dir, f)
                        if os.path.isfile(f_path):
                            if now - os.path.getmtime(f_path) > 3600: # 1 hour
                                try:
                                    os.remove(f_path)
                                    print(f"Cleaned up: {f}")
                                except Exception as e:
                                    print(f"Error deleting {f}: {e}")
            except Exception as e:
                print(f"Cleanup error: {e}")
            
            await asyncio.sleep(600) # Run every 10 mins

    asyncio.create_task(cleanup_loop())

@app.get("/")
async def root():
    return {"message": "YouTube Downloader API is running", "status": "ok"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
