# Agent Backend - RAG Tutor API

FastAPI backend for the Physical AI & Humanoid Robotics book RAG tutor.

## Environment Variables

### Required

**`GOOGLE_API_KEY`** - Google Gemini API key
- **Required**: Yes
- **Purpose**: Used for the Gemini AI model to answer questions
- **How to get**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key
- **Location**: Set in `.env` file or system environment

### Optional

**`PORT`** - Server port number
- **Required**: No (defaults to 8000)
- **Purpose**: Port for the FastAPI server
- **Default**: `8000`

## Setup

1. **Create a `.env` file** in the `agent-backend` directory:
   ```bash
   cp .env.example .env
   ```

2. **Add your API key** to the `.env` file:
   ```env
   GOOGLE_API_KEY=your_actual_api_key_here
   PORT=8000
   ```

3. **Install dependencies**:
   ```bash
   # Using uv (recommended)
   uv sync
   
   # Or using pip
   pip install -r requirements.txt
   ```

4. **Run the server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

## API Endpoints

- `GET /health` - Health check
- `POST /api/ingest` - Ingest book content into the index
- `POST /api/ask` - Ask a question (requires `{"question": "your question"}`)

## Notes

- The backend uses `os.getenv()` to read environment variables
- Make sure `.env` file is in the `agent-backend` directory
- Never commit `.env` file to git (it's already in `.gitignore`)

