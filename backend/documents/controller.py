import time
import os
import cloudinary.utils
from fastapi import HTTPException
from sqlalchemy.orm import Session

from utils.cloudinary_config import cloudinary
from documents.schemas import DocumentSave
from models.document import Document
from models.section import Section
from models.group import Group


def get_upload_signature():
    timestamp = int(time.time())
    signature = cloudinary.utils.api_sign_request(
        {"timestamp": timestamp},
        os.getenv("CLOUDINARY_API_SECRET")
    )
    return {
        "signature": signature,
        "timestamp": timestamp,
        "api_key": os.getenv("CLOUDINARY_API_KEY"),
        "cloud_name": os.getenv("CLOUDINARY_CLOUD_NAME"),
    }


def save_document(doc_data: DocumentSave, db: Session, admin_id: int):
    section = db.query(Section).filter(Section.id == doc_data.section_id).first()
    if section is None:
        raise HTTPException(status_code=404, detail="Section not found")

    group = db.query(Group).filter(Group.id == section.group_id).first()
    if group is None or group.admin_id != admin_id:
        raise HTTPException(status_code=404, detail="Section not found")

    doc_object = Document(
        section_id=doc_data.section_id,
        file_url=doc_data.file_url,
        file_name=doc_data.file_name,
        file_format=doc_data.file_format,
        file_size=doc_data.file_size,
    )
    db.add(doc_object)
    db.commit()
    db.refresh(doc_object)
    return doc_object


def get_section_documents(section_id: int, db: Session, admin_id: int):
    section = db.query(Section).filter(Section.id == section_id).first()
    if section is None:
        raise HTTPException(status_code=404, detail="Section not found")

    group = db.query(Group).filter(Group.id == section.group_id).first()
    if group is None or group.admin_id != admin_id:
        raise HTTPException(status_code=404, detail="Section not found")

    docs = db.query(Document).filter(Document.section_id == section_id).all()
    return docs


def delete_document(doc_id: int, db: Session, admin_id: int):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if doc is None:
        raise HTTPException(status_code=404, detail="Document not found")

    section = db.query(Section).filter(Section.id == doc.section_id).first()
    if section is None:
        raise HTTPException(status_code=404, detail="Document not found")

    group = db.query(Group).filter(Group.id == section.group_id).first()
    if group is None or group.admin_id != admin_id:
        raise HTTPException(status_code=404, detail="Document not found")

    db.delete(doc)
    db.commit()
    return {"detail": "Document deleted successfully"}