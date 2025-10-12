import fs from "fs/promises";
import os from "os";
import path from "path";
import { UserService } from "../src/services/UserService";

function tmpFilePath(fileName = "users.json"): string {
  const dir = path.join(os.tmpdir(), `upm-test-${Date.now()}-${Math.round(Math.random() * 10000)}`);
  return path.join(dir, fileName);
}

describe("UserService (JSON persistence)", () => {
  let svc: UserService;
  let filePath: string;

  beforeEach(async () => {
    filePath = tmpFilePath();
    svc = new UserService(filePath);
    await svc.init();
  });

  afterEach(async () => {
    // cleanup temp dir
    try {
      const dir = path.dirname(filePath);
      await fs.rm(dir, { recursive: true, force: true });
    } catch {}
  });

  test("create -> read -> update -> delete", async () => {
    const created = await svc.create({ name: "Alice", email: "alice@example.com" });
    expect(created.id).toBeDefined();
    expect(created.name).toBe("Alice");

    const read = await svc.read(created.id);
    expect(read?.email).toBe("alice@example.com");

    const updated = await svc.update(created.id, { name: "Alicia" });
    expect(updated?.name).toBe("Alicia");

    const del = await svc.delete(created.id);
    expect(del).toBe(true);

    const afterDelete = await svc.read(created.id);
    expect(afterDelete).toBeUndefined();
  });

  test("list returns all users", async () => {
    await svc.create({ name: "U1", email: "u1@example.com" });
    await svc.create({ name: "U2", email: "u2@example.com" });
    const list = await svc.list();
    expect(Object.keys(list).length).toBe(2);
  });
});
