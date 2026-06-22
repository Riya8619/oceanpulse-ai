from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db
from database.models import OceanRegion

router = APIRouter(
    prefix="/api",
    tags=["Regions"]
)


@router.get("/regions")
def get_regions(
    db: Session = Depends(get_db)
):

    regions = db.query(
        OceanRegion
    ).all()

    return regions