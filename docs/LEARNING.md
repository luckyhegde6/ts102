# 📘 TypeScript Learning Notes – Functions, Objects, and Interfaces

This document explains the TypeScript concepts demonstrated in **User Profile Manager**.

---

## 🔹 1. Function Typing

You can declare parameter and return types to make your intent explicit:

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

For object manipulation:
```
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}
```
Type inference ensures consistent input/output contracts.

## 🔹 2. Optional & Readonly Properties
Optional fields are marked with ?, meaning they might be undefined.
```typescript
interface User {
  id: string;
  name: string;
  email?: string;
}
```
Readonly prevents reassignment:

```typescript
interface User {
  readonly id: string;
}
```

## 🔹 3. Interface Merging
TypeScript merges interfaces with the same name:

    ```typescript
    interface User {
  id: string;
}

interface User {
  createdAt: Date;
}

// => Combined: { id: string; createdAt: Date; }
```
Useful for extending shared models across modules.

## 🔹 4. Utility Types

`Partial<T>`

Makes all properties optional.
Used for updates or patch operations.

`Readonly<T>`

Makes all properties immutable — great for returning safe snapshots.

`Record<K, T>`

Maps keys to value types. Perfect for in-memory stores:

```typescript
type UserStore = Record<string, User>;
const users: UserStore = {};
users['123'] = { id: '123', name: 'Alice' };
```

## 🔹 5. Structural Typing

Objects are compatible if their shape matches — not because of explicit inheritance.

```
interface Dog { bark(): void; }
class Labrador { bark() { console.log("Woof"); } }

let pet: Dog = new Labrador(); // ✅ Works
let notPet: Dog = { bark: () => console.log("Woof") }; // ✅ Also works
```
## 🧠 Key Takeaway
This project strengthens your fluency with TypeScript’s type system — how to model data contracts, handle mutability, and reason about software design with confidence.