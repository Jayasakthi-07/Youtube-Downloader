from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, HttpUrl
from app.services.downloader import downloader_service
from typing import Dict, Any, Optional

router = APIRouter()

class VideoRequest(BaseModel):
    url: HttpUrl

@router.post("/info", summary="Get Video Metadata")
async def get_video_info(request: VideoRequest):
    """
    Fetch metadata for a YouTube video or playlist.
    """
    try:
        info = await downloader_service.get_video_info(str(request.url))
        return info
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class DownloadRequest(BaseModel):
    url: HttpUrl
    format_id: str
    video_ext: Optional[str] = "mp4"
    audio_ext: Optional[str] = "m4a"
    is_audio_only: bool = False
    audio_quality: Optional[str] = "192"

@router.post("/queue", summary="Queue a Download Job")
async def queue_download(request: DownloadRequest, background_tasks: BackgroundTasks):
    """
    Queue a download job using FastAPI BackgroundTasks.
    """
    from app.core.jobs import job_store
    
    # Create Job
    job_id = job_store.create_job(type="audio" if request.is_audio_only else "video")
    
    # Start Background Task
    background_tasks.add_task(
        downloader_service.download_video,
        job_id=job_id,
        url=str(request.url),
        format_id=request.format_id,
        is_audio_only=request.is_audio_only,
        audio_quality=request.audio_quality
    )
    
    return {"job_id": job_id, "status": "queued"}

@router.get("/jobs/{job_id}", summary="Get Job Status")
async def get_job_status(job_id: str):
    from app.core.jobs import job_store
    
    job = job_store.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.get("/download/{job_id}", summary="Download File")
async def download_file(job_id: str):
    from app.core.jobs import job_store, JobStatus
    from fastapi.responses import FileResponse
    import os
    
    job = job_store.get_job(job_id)
    if not job or job["status"] != JobStatus.COMPLETED:
         raise HTTPException(status_code=400, detail="File not ready or job failed")
         
    file_path = job["data"].get("file_path")
    
    # Robust lookup: If file_path is missing or doesn't exist (due to merging changing extension),
    # search the download directory for the Job ID.
    from app.core.config import get_settings
    import glob
    settings = get_settings()
    
    if not file_path or not os.path.exists(file_path):
        # Search pattern: *[job_id].*
        pattern = os.path.join(settings.DOWNLOAD_DIR, f"*{job_id}*.*")
        matches = glob.glob(pattern)
        
        # Filter out temp files (usually .part or .ytdl)
        valid_files = [f for f in matches if not f.endswith('.part') and not f.endswith('.ytdl')]
        
        if valid_files:
            # Pick the largest file (likely the merged video) or just the first one
            file_path = max(valid_files, key=os.path.getsize)
        else:
             raise HTTPException(status_code=404, detail="File not found on server")

    return FileResponse(file_path, filename=os.path.basename(file_path))

from fastapi import WebSocket
import asyncio

@router.websocket("/ws/jobs/{job_id}")
async def job_status_ws(websocket: WebSocket, job_id: str):
    """
    WebSocket endpoint for real-time job status updates.
    """
    from app.core.jobs import job_store
    
    await websocket.accept()
    
    try:
        last_progress = -1
        while True:
            job = job_store.get_job(job_id)
            if not job:
                await websocket.send_json({"status": "error", "error": "Job not found"})
                break
                
            # Only send update if progress changed or status changed
            # (Simplification: just send every 500ms)
            await websocket.send_json(job)
            
            if job["status"] in ["completed", "failed"]:
                break
                
            await asyncio.sleep(0.5)
    except Exception as e:
        print(f"WS Error: {e}")
    finally:
        try:
            await websocket.close()
        except:
            pass
