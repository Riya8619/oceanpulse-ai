from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanMetric
from database.models import OceanRegion

from services.gemini_service import analyze_ocean_region

router = APIRouter(
    prefix="/api",
    tags=["AI Analysis"]
)


@router.get("/analyze/{region_id}")
def analyze_region(
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

    metric = (
        db.query(OceanMetric)
        .filter(
            OceanMetric.region_id == region_id
        )
        .first()
    )

    if not region or not metric:

        return {
            "error": "Region not found"
        }

    analysis = analyze_ocean_region(
        region.name,
        metric.temperature,
        metric.chlorophyll,
        metric.heat_anomaly,
        metric.bleaching_risk,
        metric.health_score
    )

    return {
        "region": region.name,
        "analysis": analysis
    }