# AI Agent Technical Specification and Guidelines - SIAPT UNAND

This document is the authoritative specification for AI coding assistants (e.g., Cursor, Claude Code, GitHub Copilot, Antigravity, Cline) and human contributors using LLMs on the SIAPT UNAND repository.

---

## 1. Project Overview

- **Project Name**: SIAPT UNAND (Sistem Informasi Perpustakaan Terpadu - Universitas Andalas)
- **Architecture**: Monorepo managed via native `npm workspaces`
- **Language**: Pure JavaScript (ECMAScript Modules / ESM). **Do not use TypeScript or CommonJS.**

---

## 2. Workspace Layout and Boundaries

```text
siapt-unand/
├── frontend/             # Workspace: "frontend" (React 19 + Vite)
├── backend/
│   └── express/          # Workspace: "@siapt/backend-express" (Express 4.x)
└── package.json          # Root monorepo configuration
```

### Boundary Rules:
- Frontend code must reside exclusively within `frontend/src/`.
- Backend code must reside exclusively within `backend/express/src/`.
- Do not place application logic, routes, or components in the repository root.
- The root directory contains only workspace orchestration and global scripts.

---

## 3. Technology Stack and Constraints

### Runtime and Module System
- **Node.js**: >= 18.0.0 (Target runtime: v20 / v22 LTS).
- **Module System**: Pure ECMAScript Modules (`import` and `export`).
  - `"type": "module"` is configured across all `package.json` files.
  - **Forbidden**: `require()`, `module.exports`, `exports.handler`.
  - **Forbidden**: TypeScript syntax (`interface`, `type`, type annotations, `.ts`, `.tsx`). All code must remain standard JavaScript (`.js`, `.jsx`).

### Frontend (React + Vite)
- **Framework**: React 19 (functional components and hooks only).
- **Tooling**: Vite.
- **API Calls**: Must use relative paths starting with `/api/` (e.g., `fetch('/api/books')`).
  - **Forbidden**: Hardcoding `http://localhost:5000` in React components.
  - Vite dev server reverse-proxies `/api/*` to `http://localhost:5000` automatically.

### Backend (Express)
- **Framework**: Express 4.x.
- **Architecture**: Route-Controller-Middleware separation:
  - `src/routes/`: Endpoint paths and middleware binding only.
  - `src/controllers/`: Request validation, business logic, and HTTP responses.
  - `src/middleware/`: Centralized error handling and route interceptors.
- **Standard JSON Response Format**:
  - Success:
    ```json
    {
      "success": true,
      "data": {}
    }
    ```
  - Error:
    ```json
    {
      "success": false,
      "message": "Human-readable error description"
    }
    ```
- **Error Handling**: All async operations must use `try...catch` blocks and pass exceptions to `next(err)`.

---

## 4. Package Installation Rules

Always install dependencies within their respective workspace using the `-w` flag:
- Frontend packages: `npm install <package-name> -w frontend`
- Backend packages: `npm install <package-name> -w @siapt/backend-express`
- Never install runtime libraries in the root `package.json`.

---

## 5. Common AI Code Generation Errors to Avoid

1. **TypeScript Leakage**: Injecting type annotations (`: string`, `interface`, `.ts` files). Reject immediately.
2. **CommonJS Usage**: Emitting `const express = require('express')`. Must use `import`.
3. **Hardcoded Ports**: Writing `http://localhost:5000/api/...` in React components. Must use `/api/...`.
4. **Root Dependency Installation**: Prompting to run `npm install <pkg>` without the `-w` flag.
5. **Wrong File Placement**: Placing components or routes in the root directory.

---

## 6. Prompt Templates for Contributors

### Template 1: Express Backend Endpoint
```text
I am working on SIAPT UNAND (monorepo).
Backend: Express.js (Node.js) using pure JavaScript ES Modules (import/export), NOT TypeScript or CommonJS.
Locations:
- Routes: backend/express/src/routes/
- Controllers: backend/express/src/controllers/

Please create an endpoint for: [feature description, e.g., search books by title].
Requirements:
1. Separate router and controller.
2. Use async/await with try-catch passing errors to next(error).
3. Standard JSON response:
   - Success: { success: true, data: ... }
   - Error: { success: false, message: ... }
```

### Template 2: React Component
```text
I am working on SIAPT UNAND frontend using React 19 and Vite (pure JavaScript, NOT TypeScript).
API requests must use relative paths starting with '/api/' via Vite proxy (do NOT use http://localhost:5000).

Please create a component for: [component description, e.g., book borrowing list].
Requirements:
1. Functional component with modern hooks (useState, useEffect).
2. Fetch via relative path (e.g., fetch('/api/borrowings')).
3. Handle loading, data, and error states cleanly.
4. Pure JavaScript only, no TypeScript syntax.
```

---

## 7. Verification Checklist

Before committing any AI-generated code:
- [ ] No TypeScript syntax or `.ts` / `.tsx` files exist.
- [ ] All imports use pure ESM syntax (`import`/`export`).
- [ ] No hardcoded `localhost:5000` URLs in frontend code.
- [ ] Backend responses match `{ success, data/message }`.
- [ ] `npm run build` exits with code 0.
- [ ] Commit message follows Conventional Commits (`feat:`, `fix:`, `docs:`, etc.).
