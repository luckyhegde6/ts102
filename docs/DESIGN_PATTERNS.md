# Design Patterns — ts102: User Profile Manager

## Patterns Used

### 1. Layered Architecture

```
API Layer (server.ts / routes)
    ↓
Service Layer (UserService)
    ↓
Persistence Layer (JsonStore)
    ↓
Data (JSON file)
```

### 2. Repository Pattern

```typescript
class JsonStore<T> {
  async load(): Promise<T[]> { ... }
  async save(items: T[]): Promise<void> { ... }
}
```

Abstracts data access behind a clean interface. Can swap for database later.

### 3. Dependency Injection

```typescript
class UserService {
  constructor(private store: JsonStore<User>) {}
}
```

### 4. Service Layer Pattern

Encapsulates business logic (UUID generation, read-only returns, validation) away from HTTP handlers.

### 5. Atomic Write Pattern

```typescript
await fs.writeFile(tmpPath, data);
await fs.rename(tmpPath, filePath);
```

Prevents partial/corrupt file writes on crash.

### 6. Immutability Pattern

```typescript
return users.map(u => Object.freeze({ ...u }));
```

Service returns copies to prevent external mutation.

## Evolution Path

- Layered Architecture → Clean Architecture (ts107)
- Repository → Generic DataStore (ts104)
- Manual DI → DI containers (ts107)
