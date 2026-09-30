from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from utils.dependencies import get_current_admin
from documents.schemas import DocumentSave, DocumentResponse
from documents.controller import (
    get_upload_signature,
    save_document,
    get_section_documents,
    delete_document,
)

router = APIRouter()


@router.get("/get-upload-signature")
def signature(authorized: int = Depends(get_current_admin)):
    return get_upload_signature()


@router.post("/save", response_model=DocumentResponse)
def save(doc_data: DocumentSave, db: Session = Depends(get_db), authorized: int = Depends(get_current_admin)):
    return save_document(doc_data, db, authorized)


@router.get("/section/{section_id}", response_model=list[DocumentResponse])
def list_docs(section_id: int, db: Session = Depends(get_db), authorized: int = Depends(get_current_admin)):
    return get_section_documents(section_id, db, authorized)


@router.delete("/{doc_id}")
def remove(doc_id: int, db: Session = Depends(get_db), authorized: int = Depends(get_current_admin)):
    return delete_document(doc_id, db, authorized)