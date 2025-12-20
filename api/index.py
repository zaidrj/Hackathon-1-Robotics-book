"""
Vercel serverless function handler for FastAPI backend
"""
import sys
from pathlib import Path

# Add agent-backend to Python path
backend_path = Path(__file__).parent.parent / "agent-backend"
sys.path.insert(0, str(backend_path))

from app.main import app

# Export the FastAPI app for Vercel
handler = app

