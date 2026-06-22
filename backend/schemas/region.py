from pydantic import BaseModel


class RegionResponse(BaseModel):

    id: int

    name: str

    ocean_type: str

    description: str | None = None

    class Config:
        from_attributes = True