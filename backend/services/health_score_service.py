def calculate_health_score(
    temperature,
    chlorophyll,
    heat_anomaly,
    bleaching_risk
):

    score = 100

    if temperature > 29:
        score -= 20

    elif temperature > 27:
        score -= 10

    if chlorophyll < 2:
        score -= 15

    if heat_anomaly > 2:
        score -= 25

    elif heat_anomaly > 1:
        score -= 10

    if bleaching_risk == "High":
        score -= 25

    elif bleaching_risk == "Moderate":
        score -= 10

    return max(score, 0)