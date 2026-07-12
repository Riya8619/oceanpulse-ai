from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanMetric, OceanRegion
from schemas.simulator import SimulationRequest
from services.simulator_service import calculate_future_score
from services.gemini_service import (
    simulate_environmental_impact,
    GeminiAuthError,
    GeminiQuotaExceeded,
)

router = APIRouter(prefix="/api", tags=["Simulator"])


@router.post("/simulator")
def run_simulation(request: SimulationRequest, db: Session = Depends(get_db)):
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

    forecast = calculate_future_score(
        metric.health_score,
        request.carbon_emissions,
        request.plastic_pollution,
        request.conservation_effort,
    )

    try:
        ai_response = simulate_environmental_impact(
            region.name,
            metric.health_score,
            forecast["future_health_score"],
            request.carbon_emissions,
            request.plastic_pollution,
            request.conservation_effort,
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

    return {
        "scenario": forecast["scenario"],
        "future_health_score": forecast["future_health_score"],
        "ai_analysis": ai_response,
    }
