from pydantic import BaseModel


class MetricResponse(BaseModel):

    id: int

    region_id: int

    temperature: float

    chlorophyll: float

    heat_anomaly: float

    bleaching_risk: str

    class Config:
        from_attributes = True