from database.database import SessionLocal
from database.models import OceanMetric
from database.models import OceanRegion

db = SessionLocal()

regions = db.query(OceanRegion).all()

print("REGIONS FOUND:", len(regions))

for region in regions:
    print(region.id, region.name)

metrics = [

    OceanMetric(
        region_id=1,
        temperature=28.4,
        chlorophyll=2.1,
        heat_anomaly=1.3,
        bleaching_risk="Moderate",
        health_score=78
    ),

    OceanMetric(
        region_id=2,
        temperature=30.1,
        chlorophyll=1.7,
        heat_anomaly=2.2,
        bleaching_risk="High",
        health_score=42
    ),

    OceanMetric(
        region_id=3,
        temperature=26.8,
        chlorophyll=3.0,
        heat_anomaly=0.8,
        bleaching_risk="Low",
        health_score=89
    )
]

db.add_all(metrics)

db.commit()

print("Ocean metrics inserted.")