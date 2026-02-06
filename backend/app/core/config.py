from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "YouTube Downloader"
    API_V1_STR: str = "/api/v1"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Path configuration
    DOWNLOAD_DIR: str = "downloads"
    TEMP_DIR: str = "temp"
    FFMPEG_PATH: str = r"C:\ffmpeg-8.0.1-essentials_build\bin"

    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
