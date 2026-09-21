# GitHub Copilot Instructions for SIAPT UNAND

## Repository Context
This is a monorepo for SIAPT UNAND (Sistem Informasi Perpustakaan Terpadu - Universitas Andalas) using npm workspaces.
The stack consists of:
- Frontend: React 19 + Vite (JavaScript)
- Backend: Express.js (Node.js ES Modules)

## Strict Coding Constraints
1. Language: Use pure JavaScript (ES Modules: `import` / `export`). Do NOT generate TypeScript (`interface`, `type`, type annotations) or CommonJS (`require()`, `module.exports`).
2. Frontend API Calls: Always use relative paths starting with `/api/` (e.g. `fetch('/api/books')`). Never hardcode `http://localhost:5000` because the Vite development server proxies `/api` to port 5000.
3. Backend Responses: Format all API responses as:
   - Success: `{ "success": true, "data": ... }`
   - Failure: `{ "success": false, "message": "..." }`
4. Backend Errors: In async route controllers, always use `try...catch` and pass caught errors to `next(error)`.
5. Package Installation: Instruct users to install packages using workspace flags:
   - Frontend: `npm install <package> -w frontend`
   - Backend: `npm install <package> -w @siapt/backend-express`
6. File Placements:
   - React components go to `frontend/src/components/` or `frontend/src/pages/`.
   - Express routes go to `backend/express/src/routes/`.
   - Express controllers go to `backend/express/src/controllers/`.
