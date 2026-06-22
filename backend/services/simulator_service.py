def calculate_future_score(
    current_score,
    carbon_emissions,
    plastic_pollution,
    conservation_effort
):

    score = current_score

    score -= carbon_emissions * 0.15

    score -= plastic_pollution * 0.10

    score += conservation_effort * 0.20

    score = max(0, min(100, int(score)))

    if score >= 80:
        scenario = "Healthy"

    elif score >= 60:
        scenario = "Moderate Risk"

    else:
        scenario = "High Risk"

    return {
        "future_health_score": score,
        "scenario": scenario
    }