from database.database import SessionLocal
from database.models import OceanRegion

db = SessionLocal()

regions = [

    OceanRegion(
        name="North Atlantic",
        ocean_type="Atlantic",
        description="North Atlantic Ocean Region"
    ),

    OceanRegion(
        name="South Atlantic",
        ocean_type="Atlantic",
        description="South Atlantic Ocean Region"
    ),

    OceanRegion(
        name="Pacific Equatorial",
        ocean_type="Pacific",
        description="Pacific Ocean Region"
    ),

    OceanRegion(
        name="Indian Ocean",
        ocean_type="Indian",
        description="Indian Ocean Region"
    ),

    OceanRegion(
        name="Arctic Ocean",
        ocean_type="Arctic",
        description="Polar Ocean Region"
    )
]

db.add_all(regions)

db.commit()

print("Seed data inserted")