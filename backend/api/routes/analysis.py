from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanMetric, OceanRegion
from services.gemini_service import (
    analyze_ocean_region,
    GeminiAuthError,
    GeminiQuotaExceeded,
)

router = APIRouter(prefix="/api", tags=["AI Analysis"])


@router.get("/analyze/{region_id}")
def analyze_region(region_id: int, db: Session = Depends(get_db)):
    region = db.query(OceanRegion).filter(OceanRegion.id == region_id).first()
    metric = db.query(OceanMetric).filter(OceanMetric.region_id == region_id).first()

    if not region or not metric:
        raise HTTPException(status_code=404, detail="Region or metrics not found")

    try:
        analysis = analyze_ocean_region(
            region.name,
            metric.temperature,
            metric.chlorophyll,
            metric.heat_anomaly,
            metric.bleaching_risk,
            metric.health_score,
        )
    except GeminiQuotaExceeded:
        raise HTTPException(
            status_code=429,
            detail="AI quota exceeded. Please try again in a minute.",
        )
    except GeminiAuthError:
        raise HTTPException(
            status_code=502,
            detail="AI service misconfigured (invalid API key). Contact the site admin.",
        )

    return {"region": region.name, "analysis": analysis}
