# Data Models

This document outlines the primary data entities for the RAG feature.

## 1. Document

Represents a single source file from the Docusaurus `docs` directory.

-   **Type**: `object`
-   **Properties**:
    -   `doc_id` (string): A unique identifier for the document, derived from its file path (e.g., `part-1-foundations/intro.md`).
    -   `part` (string): The "Part" the document belongs to (e.g., `part-1-foundations`).
    -   `chapter_title` (string): The main title of the chapter, extracted from frontmatter or the first H1 heading.
    -   `url` (string): The absolute URL path for the document on the Docusaurus site (e.g., `/docs/part-1-foundations/intro`).
    -   `content` (string): The full raw Markdown content of the document.
    -   `frontmatter` (object): The parsed YAML frontmatter from the document.

## 2. Chunk

Represents a piece of text extracted from a `Document` for embedding.

-   **Type**: `object`
-   **Properties**:
    -   `chunk_id` (string): A unique identifier for the chunk (e.g., a hash of the content).
    -   `doc_id` (string): The ID of the source `Document`.
    -   `text` (string): The actual text content of the chunk.
    -   `metadata` (object): A dictionary containing source information.
        -   `part` (string)
        -   `chapter_title` (string)
        -   `heading` (string, optional): The subheading under which this chunk appeared.
        -   `url` (string): The URL of the source document, potentially with a hash pointing to the heading.
    -   `embedding` (array of floats): The vector representation of the `text`.

## 3. API Models

### Request: `POST /api/ask`

-   **Type**: `object`
-   **Properties**:
    -   `question` (string, required): The user's question.
    -   `session_id` (string, optional): A unique identifier for the conversation.

### Response: `POST /api/ask`

-   **Type**: `object`
-   **Properties**:
    -   `answer` (string): The LLM-generated answer.
    -   `citations` (array of `Citation` objects): A list of sources used to generate the answer.

### Citation

-   **Type**: `object`
-   **Properties**:
    -   `doc_id` (string)
    -   `chapter_title` (string)
    -   `heading` (string, optional)
    -   `url` (string)
