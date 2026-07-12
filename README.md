# OceanPulse AI

AI-powered ocean health monitoring platform. FastAPI backend + React/Vite frontend, with Gemini-powered region analysis, chat, and environmental impact simulation.

## Project Structure.
├── backend/     # FastAPI + PostgreSQL (Neon) + Gemini AI

└── src/         # React frontend source (repo root doubles as the frontend project)## Prerequisites

- Python 3.11+
- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then fill in real values in backend/.env
```

Required environment variables (see `backend/.env.example`):

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Key from Google AI Studio, must start with `AIza` |
| `GEMINI_MODEL` | Defaults to `gemini-2.5-flash` |
| `DATABASE_URL` | PostgreSQL connection string |
| `ALLOWED_ORIGINS` | Comma-separated list of frontend URLs allowed by CORS |
| `NOAA_BASE_URL` / `NASA_BASE_URL` | External data source base URLs |

Run the backend:

```bash
uvicorn main:app --reload
```

API available at `http://localhost:8000`, docs at `http://localhost:8000/docs`.

## Frontend Setup

From the **repo root** (not a subfolder):

```bash
npm install

cp .env.example .env
# .env should contain:
# VITE_APP_BASE_URL=http://localhost:8000   (for local dev)
```

Run the frontend:

```bash
npm run dev
```

Frontend available at `http://localhost:5173`.

## Deployment (Render)

**Backend (Web Service)**
- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Set all env vars from `backend/.env.example` in Render's **Environment** tab
- Health check path: `/health`

**Frontend (Static Site)**
- Root directory: `.` (repo root)
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Env var: `VITE_APP_BASE_URL` = your deployed backend URL

## Security Notes

- Never commit `.env` files — only `.env.example` templates belong in git.
- If a real API key or database URL is ever accidentally committed, rotate it immediately — removing it from a future commit does not erase it from git history.

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, google-generativeai (Gemini)
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
