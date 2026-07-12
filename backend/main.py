import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import ALLOWED_ORIGINS, APP_NAME

from api.routes.regions import router as region_router
from api.routes.metrics import router as metrics_router
from api.routes.analysis import router as analysis_router
from api.routes.chat import router as chat_router
from api.routes.forecast import router as forecast_router
from api.routes.simulator import router as simulator_router
from api.routes.ocean_data import router as ocean_data_router

logging.basicConfig(level=logging.INFO)

app = FastAPI(title=APP_NAME)

# CORS: explicit origin allowlist, driven by the ALLOWED_ORIGINS env var.
# NOTE: allow_origins=["*"] combined with allow_credentials=True is invalid
# per the CORS spec and browsers will reject real credentialed requests --
# this app uses a Bearer token (not cookies), so credentials aren't needed.
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(region_router)
app.include_router(metrics_router)
app.include_router(analysis_router)
app.include_router(chat_router)
app.include_router(forecast_router)
app.include_router(simulator_router)
app.include_router(ocean_data_router)


@app.get("/")
def root():
    return {"message": "OceanPulse AI Backend Running"}


@app.get("/health")
def health():
    """Lightweight endpoint for Render's health checks."""
    return {"status": "ok"}
