# Vercel Deployment Guide: Docusaurus + FastAPI Monorepo

## Current Setup Analysis

### Frontend: Docusaurus (TypeScript/React)
- Location: `book-app/`
- Build output: `book-app/build/`
- Uses `apiUrl` from `docusaurus.config.ts` (defaults to `http://localhost:8001`)

### Backend: FastAPI (Python)
- Location: `agent-backend/app/`
- Handler: `api/index.py`
- Entry point: `agent-backend/app/main.py`

## Issues Identified

1. **API URL Configuration**: Frontend uses absolute URLs (`${apiUrl}/api/ask`) which won't work in production
2. **Vercel Handler**: FastAPI might need proper ASGI handling
3. **Routing**: Static file routing needs to be correct

## Solution

Based on Vercel documentation for monorepo deployments:

### 1. Update Frontend to Use Relative URLs in Production

The frontend should detect if it's in production and use relative URLs.

### 2. Fix Vercel Configuration

The `vercel.json` needs proper configuration for:
- Static build (Docusaurus)
- Python serverless function (FastAPI)
- Correct routing

### 3. FastAPI Handler

Vercel's `@vercel/python` supports FastAPI directly, but we need to ensure proper export.

