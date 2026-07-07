# ts102 🧠 User Profile Manager (TypeScript)

This project demonstrates **TypeScript functions, objects, and interfaces** through a small CRUD application for user profiles.

## 🚀 Setup

```bash
git clone https://github.com/luckyhegde6/ts102.git
cd ts102
npm install
npm run build
npm start
```

## Running locally

Install deps:

```bash
npm run dev
```
Run tests:
```bash
npm test
``` 

## API endpoints:

- GET /health

- POST /users — body { name, email, age? }

- GET /users

- GET /users/:id

- PATCH /users/:id

- DELETE /users/:id

## Notes, trade-offs & next steps (quick, senior-style thinking)

- **Why JSON store?** Great for demos, no external DB required, easy to inspect and portable. Good for weekend work and demos; simpler to implement and test.
- **Limitations:** Not suited for concurrent heavy writes or huge datasets. If you expect scale, switch to SQLite (Prisma or better-sqlite3) or a managed DB.
- **Durability:** `JsonStore` uses atomic write (tmp + rename) to avoid partial writes; still possible race conditions if multiple processes write simultaneously — avoid multiple server processes for now.
- **Testing:** Tests use OS temp directories; they’re deterministic and isolated.
- **Next upgrades I recommend:**
  - Swap persistence to SQLite + Prisma (schema + migrations). I can scaffold the Prisma schema and migration.
  - Add input validation (Zod) for request payloads.
  - Add authentication middleware (JWT) and RBAC for role-based access.
  - Add API integration tests (supertest) and CI (GitHub Actions) so every push runs the test suite.

---

## 🧩 Features
- Function and interface typing
- Optional and readonly fields
- Interface merging
- Partial<>, Readonly<>, and Record<> utilities
- In-memory CRUD for user profiles

## 📚 Learning Concepts

-   [DESIGN.md](docs/DESIGN.md) — Design Overview (HLD/LLD)
-   [LEARNING.md](docs/LEARNING.md) — TypeScript Learning Notes
-   [INTERVIEW.md](docs/INTERVIEW.md) — Interview Questions
-   [NEETCODE.md](docs/NEETCODE.md) — Sequence diagram, edge cases, complexity, patterns
-   [DESIGN_PATTERNS.md](docs/DESIGN_PATTERNS.md) — Design patterns used and evolution