from database import engine, Base

# Import all models so Base.metadata knows them
from models.admin import Admin
from models.group import Group
from models.section import Section
from models.photo import Photo
from models.access_request import AccessRequest
from models.session import Session
from models.document import Document


def migrate():
    print("\n🔧 Running migration...\n")
    
    # This creates only missing tables, existing ones are untouched
    Base.metadata.create_all(engine)
    
    print("✅ Migration complete")
    print("   - documents table created (if it didn't exist)")
    print("   - All existing tables left untouched")


if __name__ == "__main__":
    migrate()