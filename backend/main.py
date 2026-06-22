from fastapi import FastAPI

from api.routes.regions import router as region_router
from api.routes.metrics import router as metrics_router
from api.routes.analysis import router as analysis_router
from api.routes.chat import router as chat_router
from api.routes.forecast import router as forecast_router
from api.routes.simulator import router as simulator_router
from api.routes.ocean_data import (
    router as ocean_data_router
)


app = FastAPI(
    title="OceanPulse AI"
)

app.include_router(
    region_router
)

app.include_router(
    metrics_router
)

app.include_router(
    analysis_router
)

app.include_router(
    chat_router
)

app.include_router(
    forecast_router
)

app.include_router(
    simulator_router
)

app.include_router(
    ocean_data_router
)

@app.get("/")
def root():

    return {
        "message": "OceanPulse AI Backend Running"
    }