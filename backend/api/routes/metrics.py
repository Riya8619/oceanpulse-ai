from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanMetric

router = APIRouter(
    prefix="/api",
    tags=["Metrics"]
)


@router.get("/metrics/{region_id}")
def get_metrics(
    region_id: int,
    db: Session = Depends(get_db)
):

    metric = (
        db.query(OceanMetric)
        .filter(
            OceanMetric.region_id == region_id
        )
        .first()
    )

    return metric