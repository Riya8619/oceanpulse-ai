def generate_forecast(
    temperature,
    heat_anomaly,
    bleaching_risk,
    health_score
):

    if (
        temperature > 29
        and heat_anomaly > 2
    ):
        return {
            "risk_trend": "Increasing Risk",
            "forecast_30_days": "Moderate Risk",
            "forecast_90_days": "High Risk",
            "reason": (
                "Elevated temperature and heat anomaly "
                "indicate worsening conditions."
            )
        }

    if health_score >= 80:
        return {
            "risk_trend": "Stable",
            "forecast_30_days": "Healthy",
            "forecast_90_days": "Healthy",
            "reason": (
                "Current indicators suggest stable conditions."
            )
        }

    return {
        "risk_trend": "Watch",
        "forecast_30_days": "Moderate Risk",
        "forecast_90_days": "Moderate Risk",
        "reason": (
            "Some environmental indicators require monitoring."
        )
    }