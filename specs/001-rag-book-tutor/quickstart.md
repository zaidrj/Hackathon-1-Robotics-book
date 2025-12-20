# Quickstart

This guide explains how to set up and run the project locally for development.

## Prerequisites

-   Node.js and npm/yarn
-   Python 3.11+
-   A Gemini API Key

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Set up the environment**:
    -   Create a `.env` file in the `rag-backend` directory.
    -   Add your Gemini API key to the `.env` file:
        ```
        GEMINI_API_KEY="your_api_key_here"
        ```

## Running the Application

The application consists of two main components that need to be run separately: the Docusaurus frontend and the FastAPI backend.

### 1. Run the Frontend (Book App)

In a terminal, navigate to the `book-app` directory and run:

```bash
# Navigate to the frontend directory
cd book-app

# Install dependencies
npm install

# Start the Docusaurus development server
npm run start
```

The Docusaurus site will be available at `http://localhost:3000`.

### 2. Run the Backend (RAG Service)

In a *second* terminal, navigate to the `rag-backend` directory and run:

```bash
# Navigate to the backend directory
cd rag-backend

# Create a virtual environment and install dependencies
# Using uv (recommended)
pip install uv
uv venv
uv sync

# --- OR using venv and pip ---
# python -m venv .venv
# source .venv/bin/activate
# pip install -r requirements.txt
# (You will need to create a requirements.txt file first)


# Start the FastAPI development server
uvicorn app.main:app --reload --port 8000
```

The RAG API will be available at `http://localhost:8000`.

### 3. Ingest the Content

Before you can ask questions, you need to populate the vector store with the book's content. With the backend running, send a POST request to the `/api/ingest` endpoint.

You can use `curl`:

```bash
curl -X POST http://localhost:8000/api/ingest
```

This will process all the documents in `/book-app/docs` and load them into the local Qdrant index.

### 4. Ask a Question

Navigate to the "Ask the Book" page on the Docusaurus site (`http://localhost:3000/ask-the-book`) and ask a question. The chat interface will send requests to the backend API and display the results.
