from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import declarative_base

from sqlalchemy import Float
from sqlalchemy import ForeignKey


Base = declarative_base()


class OceanRegion(Base):

    __tablename__ = "ocean_regions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    ocean_type = Column(
        String,
        nullable=False
    )

    description = Column(
        String
    )

class OceanMetric(Base):

    __tablename__ = "ocean_metrics"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    region_id = Column(
        Integer,
        ForeignKey("ocean_regions.id")
    )

    temperature = Column(
        Float,
        nullable=False
    )

    chlorophyll = Column(
        Float,
        nullable=False
    )

    heat_anomaly = Column(
        Float,
        nullable=False
    )

    bleaching_risk = Column(
        String,
        nullable=False
    )

    health_score = Column(Integer)
