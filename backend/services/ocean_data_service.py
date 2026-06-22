import random


def get_real_ocean_data(region_name):

    # Placeholder for NOAA integration

    return {
        "temperature": round(random.uniform(24, 31), 1),
        "chlorophyll": round(random.uniform(1.0, 4.0), 1),
        "heat_anomaly": round(random.uniform(0.2, 2.5), 1)
    }