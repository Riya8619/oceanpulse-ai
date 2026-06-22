from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanMetric
from database.models import OceanRegion

from services.forecast_service import generate_forecast

router = APIRouter(
    prefix="/api",
    tags=["Forecast"]
)


@router.get("/forecast/{region_id}")
def forecast_region(
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

    if not region:
        return {
            "error": "Region not found"
        }

    if not metric:
        return {
            "error": "Metrics not found"
        }

    forecast = generate_forecast(
        metric.temperature,
        metric.heat_anomaly,
        metric.bleaching_risk,
        metric.health_score
    )

    return {
        "region": region.name,
        "current_health_score": metric.health_score,
        **forecast
    }