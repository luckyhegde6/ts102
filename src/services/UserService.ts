import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import { JsonStore } from "../persistence/JsonStore";

export class UserService {
  private store: JsonStore<Record<string, User>>;
  private users: Record<string, User> = {};

  constructor(jsonFilePath = "./data/users.json") {
    this.store = new JsonStore<Record<string, User>>(jsonFilePath);
  }

  async init() {
    this.users = await this.store.load();
  }

  async create(payload: Omit<User, "id" | "createdAt">): Promise<User> {
    const id = uuidv4();
    const user: User = {
      id,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    this.users[id] = user;
    await this.store.save(this.users);
    return user;
  }

  async read(id: string): Promise<Readonly<User> | undefined> {
    return this.users[id];
  }

  async update(id: string, updates: Partial<Omit<User, "id" | "createdAt">>): Promise<Readonly<User> | undefined> {
    const existing = this.users[id];
    if (!existing) return undefined;
    const merged: User = { ...existing, ...updates };
    this.users[id] = merged;
    await this.store.save(this.users);
    return merged;
  }

  async delete(id: string): Promise<boolean> {
    if (!this.users[id]) return false;
    delete this.users[id];
    await this.store.save(this.users);
    return true;
  }

  async list(): Promise<Readonly<Record<string, User>>> {
    return this.users;
  }

  // helper for tests / dev
  async clearAll(): Promise<void> {
    this.users = {};
    await this.store.save(this.users);
  }
}
