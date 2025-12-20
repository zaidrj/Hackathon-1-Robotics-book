---
id: 001
title: Establish Project Constitution
stage: constitution
date: 2025-12-07
surface: agent
model: gemini
feature: none
branch: master
user: USER
command: /sp.constitution
labels: ["constitution", "setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution
Project: Physical AI & Humanoid Robotics – AI-Native Book + RAG Chatbot

Context & Vision:
- We are building a full online textbook on Physical AI & Humanoid Robotics, using the "Hackathon I: Physical AI & Humanoid Robotics Textbook" Google Doc as the primary source of truth.
- The book will be published as a Docusaurus-powered documentation site with a structure similar to https://ai-native.panaversity.org/docs/preface-agent-native (preface, parts, chapters, lessons with a left-hand sidebar, table of contents, and smooth reading flow).
- On top of the book, we will build a RAG (Retrieval-Augmented Generation) chatbot that answers questions strictly using the book content, referencing specific chapters/sections.

Primary Audience:
- Beginner-to-intermediate students learning Physical AI & Humanoid Robotics.
- Panaversity / Hackathon participants and educators who want a coherent, structured textbook and an intelligent assistant to explore it.
- Readers are comfortable with basic programming and math but may be new to robotics and AI-native workflows.

Core Principles:
- Specification-first: all major features start from clear specs in .specify/, not ad-hoc coding.
- Book-first: the textbook content and its structure are the single source of truth; UI and chatbot must respect the book.
- Truth over creativity: for technical content and chatbot answers, factual accuracy and faithfulness to the book are more important than “creative” responses.
- Pedagogical clarity: every chapter must be logically ordered, beginner-friendly, and build on previous knowledge.
- Reuse & consistency: patterns (chapter layout, code example style, diagrams, glossary, callout boxes) must be consistent across the entire book.
- Accessibility & inclusivity: all content and UI must be accessible (ARIA, keyboard navigation, sufficient contrast) and understandable by global learners.
- AI collaboration: always assume an AI coding agent (Gemini CLI) is doing the mechanical work; humans provide direction, review, and corrections.

Book Content & Structure Standards:
- Follow a book-like hierarchy: Preface → Parts → Chapters → Sections → Subsections, similar to the AI Native Software Development book navigation. 
- Each “Part” groups a coherent set of chapters (e.g., Foundations, Kinematics & Control, Sensors & Perception, Humanoid Locomotion, Hardware & Safety, Capstone / Projects).
- Each chapter must:
  - Start with learning objectives and a short summary.
  - Include core theory, intuitive explanations, diagrams (or placeholders), and, where relevant, math definitions.
  - Use terminology consistently and define all important terms.
  - End with a recap, key terms, and practice questions/hackathon-style exercises.
- All book content is authored in Markdown/MDX under the Docusaurus docs directory (e.g., /docs/...), using frontmatter for title, sidebar position, and tags.
- The Google Doc content should be transformed into well-structured chapters; no copy-paste dumping. Each section must be edited for clarity, flow, and consistency.
- When in doubt, prefer more structure (shorter sections, clear headings) over long walls of text.

UI/UX & Docusaurus Standards:
- Use Docusaurus (classic template) docs layout with:
  - Left sidebar for parts/chapters navigation.
  - On-page table of contents for headings.
  - Search (built-in Docusaurus search or search plugin).
- Styling:
  - Clean, modern UI; prioritize readability over flashy design.
  - Responsive layout on mobile, tablet, and desktop.
  - Dark/light mode support.
- Navigation:
  - Book should feel like a real textbook: clear progression, “Previous/Next” links, and breadcrumbs.
  - URL structure should be stable and semantic (e.g., /docs/preface, /docs/part-1/intro, /docs/part-13/humanoid-locomotion).
- Avoid heavy custom UI frameworks unless strictly needed. Prefer staying close to Docusaurus defaults and theme extensions.

RAG Chatbot Requirements:
- The chatbot’s purpose is to answer questions about the book, guide learners through topics, and help them understand concepts from the Physical AI & Humanoid Robotics textbook.
- Retrieval:
  - Index all book content (Markdown/MDX) into a vector store.
  - Chunk content by sections/headings while preserving enough context for meaningful answers.
  - Store metadata (chapter, part, heading, URL anchor) for citations.
- Answer behavior:
  - Always ground answers in retrieved book passages.
  - Provide citations back to specific chapters/sections (e.g., “See Part 3, Chapter 2: Sensors & Perception, ‘LIDAR vs Depth Cameras’ section.”).
  - If the book does not contain the answer, the chatbot must say it does not know or explain that the topic is out of scope, rather than hallucinating.
  - Encourage the learner to read relevant sections instead of giving only “short” answers when the question is broad.
- Safety:
  - No unsafe guidance regarding robotics hardware, electricity, or physical safety; emphasize safety best practices and disclaimers when discussing hardware, mechanical design, or experiments.
  - When a user asks for dangerous modifications or unsafe experiments, the assistant must decline and redirect toward safe educational content.

Tech Stack & Architecture Standards:
- Frontend:
  - Docusaurus (React-based) for the book site.
  - Minimal custom components for callouts, diagrams, and math (e.g., admonitions, code blocks, optional math rendering).
- Backend / RAG service:
  - Implement a separate backend service for RAG (e.g., Node.js/TypeScript or Python) with clean API boundaries (e.g., /api/chat or /api/ask).
  - Use a well-supported vector store (e.g., Qdrant, pgvector, or similar) to store embedded book chunks.
  - Use Gemini (or a compatible LLM) for generation, always with retrieval context injected.
- Integration:
  - Chat UI is embedded into the Docusaurus site (e.g., a “Ask the Book” page or floating chat widget) that calls the RAG backend APIs.
  - Ensure CORS, auth (if needed), and rate limiting are considered from the start.
- Infrastructure:
  - Everything must be containerizable (Dockerfile present).
  - Use environment variables for secrets (API keys, DB credentials).
  - Keep local dev setup simple (e.g., docker-compose for vector DB + backend; npm/yarn for Docusaurus).

Code Quality & Testing:
- Languages:
  - TypeScript strict mode for frontend and any Node-based backend.
  - Python code must follow a consistent style (e.g., PEP 8) if used for RAG or tooling.
- Testing:
  - Minimum: unit tests for RAG pipeline helpers (chunking, embedding, retrieval filters).
  - Integration tests for the chat API (given a known small corpus,, verify deterministic answers and citations).
  - Smoke tests / basic E2E check for Docusaurus build and site navigation.
- Static checks:
  - Linting for TypeScript/JavaScript and Python.
  - Markdown linting for docs (headings, links, frontmatter).
- Performance:
  - Docusaurus site must build without warnings.
  - RAG API should respond in a reasonable time for typical queries (aim for <5 seconds end-to-end under normal load).

Content & Style Guidelines:
- Tone: clear, friendly, instructional; avoid unnecessary jargon; explain technical terms on first use.
- Use diagrams and examples liberally (even as TODO placeholders) to explain kinematics, control, sensors, and humanoid motion.
- Use consistent notation and symbols in formulas and pseudocode.
- Always attribute diagrams or external content when required; avoid copyright violations.
- Avoid overpromising real-world capabilities; keep claims realistic and grounded in robotics fundamentals.

AI-Driven Workflow Expectations:
- All major work should follow Spec-Kit Plus phases:
  - /sp.constitution → /sp.specify → /sp.clarify → /sp.plan → /sp.tasks → /sp.implement.
- For each significant feature (e.g., “Book structure & sidebar,” “RAG backend,” “Chat UI integration”), create a dedicated spec folder with spec, plan, tasks.
- Use Agents as collaborators, not oracles: humans must always review generated code and text.
- Constitution rules must be respected in all future specs and plans; if a later spec conflicts with this constitution, prefer updating the constitution explicitly instead of silently ignoring it.

Non-Goals (Out of Scope for Now):
- No user accounts, authentication, or payment systems.
- No complex multi-tenant authoring workflow; content editing is done via Git/Docusaurus workflow only.
- No fully autonomous physical robot control system; focus is educational, not controlling real robots in production.
- No general open-domain Q&A; the chatbot is strictly a “Book Tutor” constrained to this textbook.

Success Criteria:
- A production-ready Docusaurus site that feels like a polished online textbook with clear parts, chapters, and navigation like the AI-Native book.
- All major content from the Physical AI & Humanoid Robotics Google Doc is migrated, structured, and improved for clarity.
- Fully working RAG chatbot that:
  - Answers from the book,
  - Provides chapter/section citations,
  - Avoids hallucinations as much as possible.
- Codebase is clean, tested, and understandable to future maintainers and students.

## Response snapshot

I have successfully updated the project constitution at `.specify/memory/constitution.md`.

- **Version**: 1.0.0
- **Commit Suggestion**: `docs: establish constitution v1.0.0 for Physical AI book`

I have also created this Prompt History Record.

## Outcome

- ✅ Impact: High. The constitution is the foundational document for the project.
- 🧪 Tests: n/a
- 📁 Files: 1 created: `.specify/memory/constitution.md`
- 🔁 Next prompts: The user can now proceed with other `/sp` commands like `/sp.specify`.
- 🧠 Reflection: The user provided a very detailed prompt, which made creating the constitution straightforward. The main challenge was adapting the generic PHR creation instructions to the specific project setup (PowerShell vs. Bash).

## Evaluation notes (flywheel)

- Failure modes observed: The initial attempt to run a bash script for PHR creation failed because the project uses PowerShell. The fallback to the agent-native method worked correctly.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
