# Feature Specification: Physical AI & Humanoid Robotics - Online Book + RAG Tutor

**Feature Branch**: `001-rag-book-tutor`
**Created**: 2025-12-07
**Status**: Draft
**Input**: User description: "Project: Physical AI & Humanoid Robotics – Online Book + RAG Tutor..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read and Navigate the Book (Priority: P1)

A learner/student wants to read the textbook content in a structured and easy-to-navigate format.

**Why this priority**: This is the core functionality of the textbook. Without it, the content is not accessible as a book.

**Independent Test**: A user can open the website, see the table of contents, click on a chapter, read the content, and use the next/previous buttons to navigate between chapters.

**Acceptance Scenarios**:

1.  **Given** a user is on the book's homepage, **When** they click on "Part 1: Foundations" in the sidebar, **Then** the first chapter of Part 1 is displayed.
2.  **Given** a user is reading a chapter, **When** they click the "Next" button, **Then** they are taken to the next chapter in the sequence.
3.  **Given** a user is on a long chapter page, **When** they click a heading in the on-page table of contents, **Then** the page scrolls to that section.

### User Story 2 - Ask the Book a Question (Priority: P2)

A learner/student wants to ask a question in natural language and get a factual answer based on the book's content, with citations.

**Why this priority**: This provides significant value over a static textbook, allowing for interactive learning.

**Independent Test**: A user can go to the "Ask the Book" page, type a question related to the book's content, and receive an answer with links to the relevant sections.

**Acceptance Scenarios**:

1.  **Given** the RAG system has indexed the book, **When** a user asks "What is inverse kinematics?", **Then** the system provides a definition and cites the chapter on kinematics.
2.  **Given** a user asks a question whose answer is not in the book, **When** they submit the question, **Then** the system responds that it does not know or the topic is out of scope.
3.  **Given** a user receives an answer, **When** they click on a citation link, **Then** they are navigated to the correct chapter and section in the book.

### User Story 3 - Content Author Updates a Chapter (Priority: P3)

A content maintainer/author wants to update a chapter and have the changes reflected in the RAG system.

**Why this priority**: This ensures the long-term viability and accuracy of the project.

**Independent Test**: An author can edit a Markdown file, run a script, and then ask a question related to the change and get an updated answer.

**Acceptance Scenarios**:

1.  **Given** an author has updated the text in `docs/part-2/chapter-1.md`, **When** they run the ingestion script, **Then** the vector database is updated with the new content.
2.  **Given** the content has been re-indexed, **When** a user asks a question about the updated content, **Then** the answer reflects the changes.

### Edge Cases

-   What happens when a user asks a question that could be interpreted in multiple ways?
-   How does the system handle questions related to safety-critical topics (e.g., "How do I disable safety protocols on a robot?")? The system must refuse and provide a warning.
-   How does the system handle very long or very short user queries?
-   What is displayed while the RAG backend is processing a question? (Loading indicator).

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-1 Book Navigation**:
    -   FR-1.1: Users MUST be able to navigate the book using a hierarchical sidebar (Parts -> Chapters).
    -   FR-1.2: Users MUST be presented with "Previous" and "Next" chapter links on each content page.
    -   FR-1.3: The URL structure MUST reflect the logical hierarchy (e.g., `/docs/part-1/introduction`).
-   **FR-2 Content Presentation**:
    -   FR-2.1: Each chapter page MUST display a title, headings, and sections clearly.
    -   FR-2.2: An on-page table of contents MUST be visible and functional.
    -   FR-2.3: The site MUST be responsive and readable on mobile, tablet, and desktop devices.
-   **FR-3 RAG Ingestion**:
    -   FR-3.1: The backend MUST provide a mechanism (script or endpoint) to ingest all content from the Docusaurus docs directory.
    -   FR-3.2: Each document MUST be chunked into passages with metadata including `id`, `chapter`, `section`, and `url`.
    -   FR-3.3: Re-ingestion MUST be idempotent.
-   **FR-4 RAG Question Answering**:
    -   FR-4.1: The system MUST retrieve relevant chunks from the vector store based on a user's question.
    -   FR-4.2: The LLM MUST use the retrieved context to generate an answer.
    -   FR-4.3: The system MUST return an answer and at least one citation with a link to the source.
    -   FR-4.4: If no relevant chunks are found, the system MUST respond that the answer is not in the book.
-   **FR-5 Chat UI**:
    -   FR-5.1: Users MUST be able to submit questions through a chat interface on the Docusaurus site.
    -   FR-5.2: Responses MUST be displayed in a conversational format.
    -   FR-5.3: Citations in responses MUST be clickable links.
-   **FR-6 Safety & Robotics Constraints**:
    -   FR-6.1: The assistant MUST include safety warnings when answering questions about physical experiments or hardware.
    -   FR-6.2: The assistant MUST refuse to answer questions that ask how to bypass safety systems.

### Key Entities *(include if feature involves data)*

-   **Book Content**: The source of truth, stored in MD/MDX files, organized into Parts, Chapters, and Sections.
-   **Content Chunk**: A passage of text extracted from the book content, along with metadata (source chapter, section, URL).
-   **Vector Embedding**: A numerical representation of a content chunk, stored in the vector database.
-   **Chat Message**: A user question or an assistant response in the chat interface.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: 100% of the core Google Doc content is migrated into the Docusaurus site with the defined hierarchical structure.
-   **SC-002**: For a predefined set of 20 questions covering the book's topics, at least 80% (16/20) are answered correctly with accurate citations.
-   **SC-003**: The Docusaurus site builds with zero errors and zero broken links.
-   **SC-004**: The median response time for the `/api/ask` endpoint is under 5 seconds.
-   **SC-005**: In a user survey, at least 80% of participants agree or strongly agree that the site is easy to navigate and the chatbot is helpful.

## Assumptions

-   We will use Docusaurus for the book UI.
-   We will use a Gemini-family model for embeddings and generation.
-   The vector database interface will be abstracted to allow for different providers.
-   Content authors are comfortable with a Git-based workflow for editing Markdown.

## Open Questions / TBD

-   **Vector DB Choice**: Qdrant will be used for the initial implementation.
-   **Hosting Environment**: The RAG backend service will be hosted using Vercel Serverless Functions.
-   **Math Rendering**: KaTeX rendering for mathematical formulas will be included in the initial release.

## Clarifications

### Session 2025-12-07

- Q: Book Content Depth vs Breadth → A: Technical-heavy (equations, derivations, control math)
- Q: Math & Formalism → A: Full mathematical derivations (e.g., Jacobians, dynamics equations)
- Q: Coding Examples → A: Mixed Python + C++/ROS snippets
- Q: ROS & Simulators → A: ROS/ROS2 as core topic, Simulators included with hands-on examples