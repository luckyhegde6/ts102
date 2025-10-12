# ⚙️ Design Documentation – User Profile Manager

This file outlines the **High-Level (HLD)** and **Low-Level (LLD)** design for the project.

---

## 🏗️ High-Level Design (HLD)

### System Overview

A lightweight, in-memory CRUD system for user profiles demonstrating TypeScript’s type system and modular architecture.

```
Client (index.ts)
↓
Service Layer (UserService)
↓
In-Memory Store (Record<string, User>)
```

### Project structure
```
user-profile-manager/
├── src/
│   ├── models/
│   │   └── User.ts
│   ├── persistence/
│   │   └── JsonStore.ts
│   ├── services/
│   │   └── UserService.ts
│   ├── server.ts
│   └── index.ts
├── tests/
│   └── userService.test.ts
├── package.json
├── tsconfig.json
└── README.md
├── docs/
    ├── OVERVIEW.md
    ├── LEARNING.md
    ├── DESIGN.md
    └── INTERVIEW.md
```

### Core Components

- **Models** → Define entities (`User`)
- **Services** → Manage business logic (CRUD)
- **Utilities** → Handle validation and helpers
- **Entry Point** → Runs example operations

### Design Goals

1. Strong compile-time safety  
2. Clear separation of responsibilities  
3. Scalable for future persistence layers (DB, REST API, etc.)

---

## 🧩 Low-Level Design (LLD)

### Entities

```typescript
interface User {
  readonly id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
}
```

### Service Class
```typescript

class UserService {
  private users: Record<string, User> = {};

  create(user: User): void
  read(id: string): Readonly<User> | undefined
  update(id: string, updates: Partial<User>): void
  delete(id: string): void
  list(): Readonly<Record<string, User>>
}

```
### Patterns Used

- **Encapsulation**: `UserService` encapsulates all user-related operations.
- **Immutability**: Returned user records are `Readonly` to prevent external mutation.
- **Single Responsibility**: Each module focuses on one concern.
- **Extensibility**: Easy to replace in-memory store with DB.

## 🧠 Future Enhancements

Add Express API routes.

Introduce persistence via Prisma or MongoDB.

Add Jest tests for unit coverage.

Integrate input validation (Zod or Joi).

Enable logging and monitoring hooks.