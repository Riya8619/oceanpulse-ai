from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanRegion
from database.models import OceanMetric

from services.ocean_data_service import (
    get_real_ocean_data
)

router = APIRouter(
    prefix="/api",
    tags=["Ocean Data"]
)


@router.post("/refresh/{region_id}")
def refresh_region_data(
    region_id: int,
    db: Session = Depends(get_db)
):

    region = (
        db.query(OceanRegion)
        .filter(
            OceanRegion.id == region_id
        )
        .first()
    )

    if not region:
        return {
            "error": "Region not found"
        }

    data = get_real_ocean_data(
        region.name
    )

    metric = (
        db.query(OceanMetric)
        .filter(
            OceanMetric.region_id == region_id
        )
        .first()
    )

    metric.temperature = data["temperature"]
    metric.chlorophyll = data["chlorophyll"]
    metric.heat_anomaly = data["heat_anomaly"]

    db.commit()

    return {
        "message": "Ocean data refreshed",
        "data": data
    }