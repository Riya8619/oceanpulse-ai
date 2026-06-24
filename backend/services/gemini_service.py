import google.generativeai as genai
import os

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

print("API KEY:", API_KEY[:10] if API_KEY else "NOT FOUND")

genai.configure(
    api_key=API_KEY
)

model = genai.GenerativeModel(
    "gemini-1.5-flash"
)


def analyze_ocean_region(
    region_name,
    temperature,
    chlorophyll,
    heat_anomaly,
    bleaching_risk,
    health_score
):

    prompt = f"""
You are an expert oceanographer.

Analyze the following ocean region.

Region:
{region_name}

Metrics:

Temperature:
{temperature}°C

Chlorophyll:
{chlorophyll}

Heat Anomaly:
{heat_anomaly}

Bleaching Risk:
{bleaching_risk}

Health Score:
{health_score}/100

Provide:

1. Ocean Health Summary

2. Environmental Significance

3. Potential Ecological Risks

4. Recommended Conservation Actions

Keep response under 250 words.
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        print("Gemini Error:", e)

        return """
OceanPulse AI is temporarily unavailable.

Current conditions indicate elevated ocean stress.
Rising sea temperatures and heat anomalies may increase coral bleaching risk and ecosystem instability.

Please try again later.
"""


def ask_ocean_ai(
    region_name,
    temperature,
    chlorophyll,
    heat_anomaly,
    bleaching_risk,
    health_score,
    user_question
):

    prompt = f"""
You are OceanPulse AI.

Region:
{region_name}

Ocean Metrics:

Temperature:
{temperature}°C

Chlorophyll:
{chlorophyll}

Heat Anomaly:
{heat_anomaly}

Bleaching Risk:
{bleaching_risk}

Health Score:
{health_score}/100

User Question:
{user_question}

Answer using the ocean data provided.

Be concise.

Maximum 150 words.

Explain in simple language.
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        print("Gemini Error:", e)

        return """
OceanPulse AI is temporarily unavailable because the AI quota has been exceeded.

Based on the available ocean data, the region should continue to be monitored for temperature changes, bleaching risk, and ecosystem health.

Please try again later.
"""


def simulate_environmental_impact(
    region_name,
    current_score,
    future_score,
    carbon_emissions,
    plastic_pollution,
    conservation_effort
):

    prompt = f"""
You are OceanPulse AI.

Ocean Region:
{region_name}

Current Health Score:
{current_score}/100

Projected Health Score:
{future_score}/100

Carbon Emissions:
{carbon_emissions}/100

Plastic Pollution:
{plastic_pollution}/100

Conservation Effort:
{conservation_effort}/100

Explain:

1. Expected future ocean conditions

2. Environmental consequences

3. Risks to marine ecosystems

4. Recommended actions

Keep response under 200 words.

Use simple language.
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        print("Gemini Error:", e)

        return """
Simulation temporarily unavailable because the AI quota has been exceeded.

Higher emissions and pollution generally reduce ocean health, while stronger conservation efforts improve ecosystem resilience and long-term sustainability.

Please try again later.
"""