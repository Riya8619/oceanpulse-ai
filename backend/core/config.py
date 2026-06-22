from dotenv import load_dotenv
import os

load_dotenv()

APP_NAME = os.getenv("APP_NAME")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

DATABASE_URL = os.getenv("DATABASE_URL")

NOAA_BASE_URL = os.getenv("NOAA_BASE_URL")

NASA_BASE_URL = os.getenv("NASA_BASE_URL")