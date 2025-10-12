# 🧠 TypeScript & Design Interview Questions

A mix of conceptual and applied questions based on this project.

---

## 🔸 TypeScript Concepts

1. What is **structural typing**, and how does it differ from nominal typing?
2. How does TypeScript handle **interface merging**?
3. What’s the difference between `interface` and `type` aliases?
4. When should you use **`Readonly`** vs **`const`**?
5. How is `Partial<T>` different from defining optional fields directly?
6. What is **type inference**, and when can it backfire?
7. Can a function type be extended or intersected with another? Example?
8. Explain **utility types** and how they simplify reusable logic.

---

## 🔸 Low-Level Design (LLD)

1. How would you design a **UserService** class for CRUD operations?
2. Why use a `Record<string, User>` instead of a plain object?
3. How can you enforce immutability while allowing controlled updates?
4. What patterns help isolate business logic from data access?

---

## 🔸 High-Level Design (HLD)

1. How would you scale this User Profile Manager to support thousands of users?
2. What persistence strategy would you use (DB, caching)?
3. How would you separate API layer, service layer, and data layer?
4. How would you add authentication and access control?

---

## 🔸 Behavioral / Leadership

1. Describe how you mentor a teammate new to TypeScript.
2. How do you ensure consistency in typing conventions across a team?
3. How do you balance strict type safety vs developer productivity?

---

## 🧩 Practice Scenario

> You’re asked to extend this system to store user preferences and roles.  
> How would you design your types and services to accommodate these features?

Think aloud: identify constraints, interfaces, and change propagation paths.