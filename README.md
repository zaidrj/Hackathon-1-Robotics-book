# Physical AI & Humanoid Robotics - Online Book + RAG Tutor

This repository contains the source code for an online, AI-native textbook on Physical AI and Humanoid Robotics.

## Project Overview

This project has two main components:

1.  **The Book (`/book-app`)**: A Docusaurus-based website that hosts the textbook content. It's designed to be a professional, navigable online book with parts, chapters, and sections.
2.  **The RAG Tutor (`/rag-backend`)**: A FastAPI-based RAG (Retrieval-Augmented Generation) chatbot that allows readers to ask questions about the book's content and get answers with citations.

## Local Development

Please see the `README.md` files in the `/book-app` and `/rag-backend` directories for specific setup and usage instructions.

In general, you will need to:

1.  Run the Docusaurus frontend (`npm start` in `/book-app`).
2.  Run the FastAPI backend (`uvicorn ...` in `/rag-backend`).
3.  Run the ingestion pipeline (`/api/ingest`) to populate the vector store.
4.  Navigate to `http://localhost:3000` to read the book and `http://localhost:3000/ask-the-book` to interact with the tutor.
