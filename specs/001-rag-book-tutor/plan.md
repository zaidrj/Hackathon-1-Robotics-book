# Implementation Plan: Physical AI & Humanoid Robotics - Online Book + RAG Tutor

**Branch**: `001-rag-book-tutor` | **Date**: 2025-12-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-rag-book-tutor/spec.md`

## Summary

This plan outlines the implementation of a Docusaurus-based online textbook for "Physical AI & Humanoid Robotics" with an integrated RAG (Retrieval-Augmented Generation) chatbot tutor. The project will migrate content from a Google Doc into a structured, navigable Docusaurus site. A FastAPI backend will power the RAG functionality, using a local vector store (Qdrant) to provide students with an interactive way to query the book's content.

## Technical Context

**Language/Version**:
- Frontend: TypeScript (optional, but preferred for React components)
- Backend: Python 3.11+

**Primary Dependencies**:
- Frontend: Docusaurus v2, React
- Backend: FastAPI, Uvicorn, Qdrant, a Gemini API client, a Markdown parser.

**Storage**:
- Local file system for the vector store (Qdrant local/on-disk mode).

**Testing**:
- Frontend: Jest or similar for React components.
- Backend: pytest for FastAPI and RAG logic.

**Target Platform**:
- Web (Docusaurus static site)
- Backend service deployable to Vercel Serverless or similar.

**Project Type**: Web application (frontend + backend).

**Performance Goals**:
- RAG API median response time under 5 seconds.
- Docusaurus site builds with no errors.

**Constraints**:
- No Docker or docker-compose for local development.
- Vector store must run in-process or as simple local files.
- Local development must be simple (`npm start` and `uvicorn ...`).

**Scale/Scope**:
- Initial scope is limited to the content of the provided Google Doc.
- The chatbot is constrained to the book content only.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Specification-first**: PASSED - This plan is derived from a detailed spec.
- **Book-first**: PASSED - The plan centers around the Docusaurus book as the source of truth.
- **Truth over creativity**: PASSED - The RAG implementation is designed to ground answers in book content.
- **Pedagogical clarity**: PASSED - The proposed book structure follows a logical, pedagogical flow.
- **Reuse & consistency**: PASSED - The plan specifies a consistent structure for docs and components.
- **Accessibility & inclusivity**: PASSED - Docusaurus has good accessibility support out of the box. Further checks needed during UI implementation.
- **AI collaboration**: PASSED - The entire workflow is designed around AI agent collaboration.
- **Tech Stack & Architecture**: PASSED - The tech stack aligns with the constitution's standards (Docusaurus, Python/FastAPI backend). The user has provided a constraint to *not* use Docker for local dev, which is a deviation from the constitution's suggestion but is an explicit project requirement.

## Project Structure

### Documentation (this feature)

```text
specs/001-rag-book-tutor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── openapi.yaml
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
/book-app
  /docs              # Preface, Parts, Chapters
  /src               # Chat page + custom components
  docusaurus.config.js
  sidebars.js
  package.json
/rag-backend
  /app
    main.py
    config.py
    /routes
      ask.py
      ingest.py
    /rag
      loader.py
      chunker.py
      embeddings.py
      vector_store.py
      generator.py
      types.py
    /utils
      logger.py
      errors.py
  /tests
  pyproject.toml
```

**Structure Decision**: A monorepo structure with two main packages: `book-app` for the Docusaurus frontend and `rag-backend` for the FastAPI service. This clearly separates the two components while keeping them in a single repository for easy management.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| No Docker for local dev | User constraint to simplify local setup for beginners. | Using Docker (as suggested in constitution) was rejected by the user to avoid requiring Docker installation for local development. |