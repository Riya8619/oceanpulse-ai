from database.database import SessionLocal
from database.models import OceanRegion

db = SessionLocal()

print("COUNT:", db.query(OceanRegion).count())