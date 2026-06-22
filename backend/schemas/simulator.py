from pydantic import BaseModel


class SimulationRequest(BaseModel):

    region_id: int

    carbon_emissions: int

    plastic_pollution: int

    conservation_effort: int


class SimulationResponse(BaseModel):

    scenario: str

    future_health_score: int

    ai_analysis: str