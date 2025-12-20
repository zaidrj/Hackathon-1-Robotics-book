import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# use absolute imports when running `uvicorn app.main:app`
from app.ingest import ingest_book
from app.rag import retrieve_context
from app.agent import run_agent  # <-- async function

app = FastAPI(title="Physical AI Book Agent")

# CORS configuration for local dev and Vercel production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Vercel deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    question: str


@app.get("/health")
def health():
    print("[HEALTH] ping")
    return {"status": "ok"}


@app.post("/api/ingest")
def api_ingest():
    print("[INGEST] start")
    result = ingest_book()
    print(f"[INGEST] done: {result}")
    return result


@app.post("/api/ask")
async def api_ask(req: AskRequest):
    print(f"[ASK] question={req.question!r}")

    try:
        # sync RAG context retrieval
        context = retrieve_context(req.question)

        if not context.strip():
            print("[ASK] no context found")
            return {"answer": "This information is not found in the textbook."}

        print("[ASK] context found, calling agent...")

        # CRITICAL: await the async agent call
        answer = await run_agent(req.question, context)

        print("[ASK] answer produced")
        # answer should be a plain string
        return {"answer": answer}

    except ValueError as e:
        # Handle missing API key error
        error_msg = str(e)
        print(f"[ASK][ERROR] {error_msg}")
        if "GOOGLE_API_KEY" in error_msg:
            return {
                "answer": "Error: GOOGLE_API_KEY environment variable is not set. Please configure it in Vercel environment variables.",
                "error": "missing_api_key"
            }
        return {"answer": f"Error: {error_msg}", "error": "configuration_error"}
    except Exception as e:
        print(f"[ASK][ERROR] {repr(e)}")
        import traceback
        traceback.print_exc()
        return {"answer": "Error: backend failed while calling the model. Check server logs.", "error": "runtime_error"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
