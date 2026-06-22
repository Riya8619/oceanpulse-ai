from database.database import SessionLocal
from database.models import OceanRegion

db = SessionLocal()

regions = db.query(OceanRegion).all()

print(f"Found {len(regions)} regions")

for region in regions:
    print(region.id, region.name)