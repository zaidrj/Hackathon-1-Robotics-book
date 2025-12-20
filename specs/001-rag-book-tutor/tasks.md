# Tasks: Physical AI & Humanoid Robotics - Online Book + RAG Tutor

**Input**: Design documents from `specs/001-rag-book-tutor/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.

- [X] T001 Create monorepo structure with `/book-app` and `/rag-backend` directories.
- [X] T002 [P] Initialize `git` and create a root `.gitignore` file.
- [X] T003 [P] Initialize Docusaurus classic template in `/book-app`.
- [X] T004 [P] Initialize FastAPI project in `/rag-backend` with a virtual environment.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [X] T005 [US1] Create the initial Docusaurus folder structure under `/book-app/docs`.
- [X] T006 [US1] Configure Docusaurus sidebars in `sidebars.js` for basic navigation.
- [X] T007 [US2] Set up FastAPI `main.py` with CORS configuration and a health check endpoint.
- [X] T008 [US2] Create basic data classes for `Document` and `Chunk` in `/rag-backend/app/rag/types.py`.

## Phase 3: User Story 1 - Read and Navigate the Book (Priority: P1) 🎯 MVP

**Goal**: A learner can read the textbook content in a structured and easy-to-navigate format.
**Independent Test**: A user can open the website, see the table of contents, click on a chapter, and use the next/previous buttons.

### Implementation for User Story 1
- [X] T009 [P] [US1] Configure Docusaurus `docusaurus.config.js` with site title, theme options (dark/light mode), and navbar.
- [X] T010 [US1] Migrate Preface and Part 1 content from Google Doc into `/book-app/docs/preface.md` and `/book-app/docs/part-1-foundations/`.
- [X] T011 [US1] Migrate content for remaining parts (2-7) into their respective directories under `/book-app/docs/`.
- [X] T012 [P] [US1] Add Docusaurus admonition callouts (`note`, `warning`, `tip`) to relevant content, especially for hardware safety.
- [X] T013 [US1] Manually test all pages and navigation links by running the Docusaurus dev server.

## Phase 4: User Story 3 - Content Author Updates a Chapter (Priority: P3)

**Goal**: A content author can update a chapter and have the changes reflected in the RAG system.
**Independent Test**: An author can edit a Markdown file, run an ingestion script, and then see the change reflected in search results.

### Implementation for User Story 3
- [X] T014 [US3] Implement the document loader in `/rag-backend/app/rag/loader.py` to read and parse files from `/book-app/docs`.
- [X] T015 [US3] Implement the text chunker in `/rag-backend/app/rag/chunker.py`.
- [X] T016 [P] [US3] Implement the embeddings client in `/rag-backend/app/rag/embeddings.py` to communicate with the Gemini API.
- [X] T017 [US3] Implement the vector store wrapper in `/rag-backend/app/rag/vector_store.py` using Qdrant's local/on-disk mode.
- [X] T018 [US3] Implement the `POST /api/ingest` endpoint in `/rag-backend/app/routes/ingest.py` to orchestrate loading, chunking, and upserting.

## Phase 5: User Story 2 - Ask the Book a Question (Priority: P2)

**Goal**: A learner can ask a question and get a factual answer based on the book's content, with citations.
**Independent Test**: A user can go to the "Ask the Book" page, ask a question, and receive a cited answer.

### Implementation for User Story 2
- [X] T019 [P] [US2] Implement the RAG prompt builder and LLM call logic in `/rag-backend/app/rag/generator.py`.
- [X] T020 [US2] Implement the `POST /api/ask` endpoint in `/rag-backend/app/routes/ask.py`, including the logic for searching the vector store.
- [X] T021 [P] [US2] Create the "Ask the Book" chat page layout in `/book-app/src/pages/ask-the-book.tsx`.
- [X] T022 [US2] Implement the frontend logic in `ask-the-book.tsx` to call the `/api/ask` endpoint and display the response.
- [X] T023 [US2] Implement the UI for displaying citations as clickable links that navigate to the correct document section.

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T024 [P] Add unit tests for the RAG backend (`loader`, `chunker`, `vector_store`).
- [X] T025 Add an integration test for the `/api/ask` endpoint using a small sample corpus.
- [X] T026 [P] Write README files for both `/book-app` and `/rag-backend` explaining setup and usage.
- [X] T027 Update the root `README.md` with the overall project description and architecture.
- [X] T028 Manually test the full user flow from content ingestion to asking a question in the UI.

## Dependencies & Execution Order

- **Phase 1 & 2 (Setup & Foundational)** must be completed before any user story work can begin.
- **User Story 1 (Phase 3)** can be implemented and delivered independently. It is the MVP.
- **User Story 3 (Phase 4)** depends on Phase 2. It builds the backend ingestion pipeline.
- **User Story 2 (Phase 5)** depends on Phase 4 (ingestion) being complete.
- **Phase 6 (Polish)** can be done after all user stories are functionally complete.
