from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanMetric, OceanRegion
from schemas.chat import ChatRequest
from services.gemini_service import (
    ask_ocean_ai,
    GeminiAuthError,
    GeminiQuotaExceeded,
)

router = APIRouter(prefix="/api", tags=["Chat"])


@router.post("/chat")
def ocean_chat(request: ChatRequest, db: Session = Depends(get_db)):
    region = db.query(OceanRegion).filter(OceanRegion.id == request.region_id).first()
    metric = (
        db.query(OceanMetric)
        .filter(OceanMetric.region_id == request.region_id)
        .first()
    )

    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    if not metric:
        raise HTTPException(status_code=404, detail="Metrics not found")

    try:
        answer = ask_ocean_ai(
            region.name,
            metric.temperature,
            metric.chlorophyll,
            metric.heat_anomaly,
            metric.bleaching_risk,
            metric.health_score,
            request.question,
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

    return {"answer": answer}
