# Vercel Deployment Fixes Applied

## Analysis Summary

### Current Stack
- **Frontend**: Docusaurus (TypeScript/React) - NOT Next.js
- **Backend**: FastAPI (Python)
- **Deployment**: Vercel Monorepo

### Issues Found & Fixed

#### 1. ✅ Frontend API URL Configuration
**Problem**: Frontend was using absolute URLs (`${apiUrl}/api/ask`) which wouldn't work in production on Vercel.

**Solution**: Updated both `ChatWidget.tsx` and `ask-the-book.tsx` to:
- Use relative URLs (`/api/ask`) in production (when not on localhost)
- Use absolute URLs (`http://localhost:8001/api/ask`) in development

**Files Changed**:
- `book-app/src/components/ChatWidget.tsx`
- `book-app/src/pages/ask-the-book.tsx`

#### 2. ✅ Vercel Configuration
**Problem**: `vercel.json` needed explicit build commands to ensure frontend builds first.

**Solution**: Added explicit build commands:
- `buildCommand`: Builds the Docusaurus frontend
- `outputDirectory`: Points to the build output
- `installCommand`: Installs npm dependencies

**File Changed**: `vercel.json`

#### 3. ✅ Build Order
**Current Configuration**:
1. Frontend builds first (static build from `book-app/`)
2. Backend builds second (Python serverless function from `api/index.py`)

#### 4. ✅ Routing Configuration
- `/api/*` → Python backend (`/api/index.py`)
- `/health` → Python backend
- `/*` → Frontend static files (`/book-app/build/$1`)

## Key Points from Vercel Documentation

1. **Static Build**: For Docusaurus, use `@vercel/static-build` with `distDir: "build"` (relative to source directory)

2. **Python Functions**: Vercel's `@vercel/python` supports FastAPI directly - no need for Mangum if the app is properly exported

3. **Monorepo**: Both frontend and backend can be deployed together using the `builds` array in `vercel.json`

4. **API Routes**: FastAPI routes should match the Vercel routing pattern. Since routes are `/api/ask` and Vercel routes `/api/(.*)` to the handler, FastAPI receives the full path `/api/ask` which matches.

## Environment Variables Required

Set in Vercel Dashboard → Settings → Environment Variables:

1. **GOOGLE_API_KEY** (required)
   - Your Google Gemini API key
   - Used by the RAG tutor agent

2. **API_URL** (optional)
   - Frontend API URL
   - Defaults to `http://localhost:8001` in development
   - Not needed in production (uses relative URLs)

## Next Steps

1. Push these changes to GitHub
2. Vercel will automatically detect and redeploy
3. Verify the deployment:
   - Frontend should load at the root URL
   - Backend API should work at `/api/ask` and `/api/ingest`
   - Health check at `/health` should return `{"status": "ok"}`

## Testing

After deployment, test:
- ✅ Frontend loads correctly
- ✅ `/health` endpoint works
- ✅ `/api/ask` endpoint works (requires GOOGLE_API_KEY)
- ✅ Chat widget can communicate with backend

