from typing import Dict, Any
from enum import Enum
import uuid
import time

class JobStatus(str, Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class JobStore:
    def __init__(self):
        self._jobs: Dict[str, Dict[str, Any]] = {}

    def create_job(self, type: str = "download") -> str:
        job_id = str(uuid.uuid4())
        self._jobs[job_id] = {
            "id": job_id,
            "type": type,
            "status": JobStatus.QUEUED,
            "progress": 0,
            "data": {},
            "created_at": time.time(),
            "updated_at": time.time(),
            "error": None
        }
        return job_id

    def update_job(self, job_id: str, status: JobStatus = None, progress: float = None, data: Dict = None, error: str = None):
        if job_id not in self._jobs:
            return
        
        job = self._jobs[job_id]
        if status:
            job["status"] = status
        if progress is not None:
            job["progress"] = progress
        if data:
            job["data"].update(data)
        if error:
            job["error"] = error
        
        job["updated_at"] = time.time()

    def get_job(self, job_id: str) -> Dict[str, Any]:
        return self._jobs.get(job_id)

    def list_jobs(self) -> Dict[str, Dict[str, Any]]:
        return self._jobs

# Global instance
job_store = JobStore()
