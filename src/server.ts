import express from "express";
import bodyParser from "body-parser";
import { UserService } from "./services/UserService";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const DATA_FILE = process.env.DATA_FILE || "./data/users.json";

async function main() {
  const userService = new UserService(DATA_FILE);
  await userService.init();

  const app = express();
  app.use(bodyParser.json());

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.post("/users", async (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    const user = await userService.create({ name, email, age });
    res.status(201).json(user);
  });

  app.get("/users", async (_req, res) => {
    const users = await userService.list();
    res.json(Object.values(users));
  });

  app.get("/users/:id", async (req, res) => {
    const user = await userService.read(req.params.id);
    if (!user) return res.status(404).json({ error: "not found" });
    res.json(user);
  });

  app.patch("/users/:id", async (req, res) => {
    const updates = req.body as { name?: string; email?: string; age?: number };
    const updated = await userService.update(req.params.id, updates);
    if (!updated) return res.status(404).json({ error: "not found" });
    res.json(updated);
  });

  app.delete("/users/:id", async (req, res) => {
    const ok = await userService.delete(req.params.id);
    res.status(ok ? 204 : 404).send();
  });

  app.listen(PORT, () => {
    console.log(`User Profile Manager API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
