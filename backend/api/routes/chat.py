from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanMetric
from database.models import OceanRegion

from schemas.chat import ChatRequest

from services.gemini_service import ask_ocean_ai

router = APIRouter(
    prefix="/api",
    tags=["Chat"]
)


@router.post("/chat")
def ocean_chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    region = (
        db.query(OceanRegion)
        .filter(
            OceanRegion.id == request.region_id
        )
        .first()
    )

    metric = (
        db.query(OceanMetric)
        .filter(
            OceanMetric.region_id == request.region_id
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

    answer = ask_ocean_ai(
        region.name,
        metric.temperature,
        metric.chlorophyll,
        metric.heat_anomaly,
        metric.bleaching_risk,
        metric.health_score,
        request.question
    )

    return {
        "answer": answer
    }