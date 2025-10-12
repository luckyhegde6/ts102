export interface User {
  readonly id: string;      // immutable id
  name: string;
  email: string;
  age?: number;
  createdAt: string; // ISO string
}