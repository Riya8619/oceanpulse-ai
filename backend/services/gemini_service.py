"""
Gemini AI service.

Design notes (read this before touching model/config logic):
- The client is configured LAZILY (on first use), not at import time.
  Importing this module must never crash the app or silently cache a
  stale/missing key -- FastAPI imports all routers at startup, so an
  import-time failure here would take down endpoints that don't even
  use Gemini.
- The model name is configurable via the GEMINI_MODEL env var so you
  never again have to hunt through source files to change it. Default
  is a current, actively-supported model.
- Quota (429 / ResourceExhausted) errors are distinguished from auth
  errors (401/403 / PermissionDenied) and from generic failures, and
  are logged distinctly, so "quota exceeded" and "your key is wrong"
  never look like the same problem again.
- A tiny in-memory TTL cache is used for /analyze so that repeatedly
  loading the dashboard doesn't re-spend quota on identical requests.
"""

import logging
import os
import time
from typing import Optional

import google.generativeai as genai
from google.api_core.exceptions import (
    GoogleAPIError,
    PermissionDenied,
    ResourceExhausted,
    Unauthenticated,
)

logger = logging.getLogger("oceanpulse.gemini")

DEFAULT_MODEL = "gemini-2.5-flash"
CACHE_TTL_SECONDS = int(os.getenv("GEMINI_CACHE_TTL_SECONDS", "300"))

_client_ready = False
_model: Optional[genai.GenerativeModel] = None
_cache: dict[str, tuple[float, str]] = {}


def _get_model() -> genai.GenerativeModel:
    """Configure the Gemini client and build the model on first use only."""
    global _client_ready, _model

    if _client_ready and _model is not None:
        return _model

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not set. Set it in your environment "
            "(Render dashboard -> Environment, or local .env)."
        )
    if not api_key.startswith("AIza"):
        # Not fatal (Google may issue other formats), but this is the
        # single most common cause of "quota exceeded" that is actually
        # an invalid/wrong-type credential. Surface it loudly in logs.
        logger.warning(
            "GEMINI_API_KEY does not look like a Generative Language API "
            "key (expected it to start with 'AIza...'). Get a real key "
            "from https://aistudio.google.com/apikey."
        )

    model_name = os.getenv("GEMINI_MODEL", DEFAULT_MODEL)
    genai.configure(api_key=api_key)
    _model = genai.GenerativeModel(model_name)
    _client_ready = True
    logger.info("Gemini client initialized with model=%s", model_name)
    return _model


def _cache_get(key: str) -> Optional[str]:
    entry = _cache.get(key)
    if not entry:
        return None
    expires_at, value = entry
    if time.time() > expires_at:
        _cache.pop(key, None)
        return None
    return value


def _cache_set(key: str, value: str) -> None:
    _cache[key] = (time.time() + CACHE_TTL_SECONDS, value)


def _call_gemini(prompt: str, *, cache_key: Optional[str] = None) -> str:
    """
    Single choke point for every Gemini call in the app.
    Raises GeminiQuotaExceeded / GeminiAuthError / GeminiError so callers
    (routes) can decide how to respond instead of guessing from generic
    Exception text.
    """
    if cache_key:
        cached = _cache_get(cache_key)
        if cached is not None:
            logger.info("Gemini cache hit for key=%s", cache_key)
            return cached

    model = _get_model()

    try:
        response = model.generate_content(prompt)
        text = response.text
    except ResourceExhausted as e:
        logger.error("Gemini quota exceeded: %s", e)
        raise GeminiQuotaExceeded(str(e)) from e
    except (PermissionDenied, Unauthenticated) as e:
        logger.error("Gemini auth error (bad/invalid API key): %s", e)
        raise GeminiAuthError(str(e)) from e
    except GoogleAPIError as e:
        logger.error("Gemini API error: %s", e)
        raise GeminiError(str(e)) from e

    if cache_key:
        _cache_set(cache_key, text)
    return text


class GeminiError(Exception):
    """Generic Gemini failure."""


class GeminiQuotaExceeded(GeminiError):
    """Raised on 429 / ResourceExhausted."""


class GeminiAuthError(GeminiError):
    """Raised on 401/403 -- invalid or wrong-type API key."""


def analyze_ocean_region(
    region_name,
    temperature,
    chlorophyll,
    heat_anomaly,
    bleaching_risk,
    health_score,
):
    prompt = f"""You are an expert oceanographer.

Analyze the following ocean region.

Region: {region_name}

Metrics:
Temperature: {temperature}°C
Chlorophyll: {chlorophyll}
Heat Anomaly: {heat_anomaly}
Bleaching Risk: {bleaching_risk}
Health Score: {health_score}/100

Provide:
1. Ocean Health Summary
2. Environmental Significance
3. Potential Ecological Risks
4. Recommended Conservation Actions

Keep response under 250 words."""

    # Cache per-region since the same region/metrics combo is analyzed
    # repeatedly (e.g. every dashboard load) -- this is what was burning
    # your quota the fastest.
    cache_key = f"analyze:{region_name}:{temperature}:{chlorophyll}:{heat_anomaly}:{bleaching_risk}:{health_score}"
    return _call_gemini(prompt, cache_key=cache_key)


def ask_ocean_ai(
    region_name,
    temperature,
    chlorophyll,
    heat_anomaly,
    bleaching_risk,
    health_score,
    user_question,
):
    prompt = f"""You are OceanPulse AI.

Region: {region_name}

Ocean Metrics:
Temperature: {temperature}°C
Chlorophyll: {chlorophyll}
Heat Anomaly: {heat_anomaly}
Bleaching Risk: {bleaching_risk}
Health Score: {health_score}/100

User Question: {user_question}

Answer using the ocean data provided. Be concise. Maximum 150 words.
Explain in simple language."""

    # Chat is inherently per-question, so it is NOT cached.
    return _call_gemini(prompt)


def simulate_environmental_impact(
    region_name,
    current_score,
    future_score,
    carbon_emissions,
    plastic_pollution,
    conservation_effort,
):
    prompt = f"""You are OceanPulse AI.

Ocean Region: {region_name}
Current Health Score: {current_score}/100
Projected Health Score: {future_score}/100
Carbon Emissions: {carbon_emissions}/100
Plastic Pollution: {plastic_pollution}/100
Conservation Effort: {conservation_effort}/100

Explain:
1. Expected future ocean conditions
2. Environmental consequences
3. Risks to marine ecosystems
4. Recommended actions

Keep response under 200 words. Use simple language."""

    cache_key = (
        f"sim:{region_name}:{current_score}:{future_score}:"
        f"{carbon_emissions}:{plastic_pollution}:{conservation_effort}"
    )
    return _call_gemini(prompt, cache_key=cache_key)
