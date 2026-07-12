"""
Centralized, validated app configuration.

Fails loudly and immediately at import time if a required variable is
missing, instead of letting the app boot with silent None values that
only surface as confusing 500s deep inside a request.
"""

import os
from dotenv import load_dotenv

load_dotenv()

REQUIRED_VARS = ["GEMINI_API_KEY", "DATABASE_URL"]


def _get_required(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(
            f"Required environment variable '{name}' is not set. "
            "Set it in your Render service's Environment tab (or a local .env)."
        )
    return value


def _get_optional(name: str, default: str | None = None) -> str | None:
    return os.getenv(name, default)


APP_NAME = _get_optional("APP_NAME", "OceanPulse AI")
ENVIRONMENT = _get_optional("ENVIRONMENT", "development")

GEMINI_API_KEY = _get_required("GEMINI_API_KEY")
GEMINI_MODEL = _get_optional("GEMINI_MODEL", "gemini-2.5-flash")

DATABASE_URL = _get_required("DATABASE_URL")

NOAA_BASE_URL = _get_optional("NOAA_BASE_URL")
NASA_BASE_URL = _get_optional("NASA_BASE_URL")

# Comma-separated list, e.g. "https://oceanpulse.vercel.app,http://localhost:5173"
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in _get_optional("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]
