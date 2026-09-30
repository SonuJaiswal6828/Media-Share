from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DocumentSave(BaseModel):
    section_id: int
    file_url: str
    file_name: str
    file_format: Optional[str] = None
    file_size: Optional[int] = None

class DocumentResponse(BaseModel):
    id: int
    section_id: int
    file_url: str
    file_name: str
    file_format: Optional[str]
    file_size: Optional[int]
    uploaded_at: datetime
    
    class Config:
        from_attributes = True