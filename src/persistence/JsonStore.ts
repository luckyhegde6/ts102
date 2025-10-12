import fs from "fs/promises";
import path from "path";

export class JsonStore<T extends Record<string, any>> {
  private filePath: string;
  private data: T | null = null;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
  }

  private async ensureFile(): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify({}, null, 2), "utf8");
    }
  }

  async load(): Promise<T> {
    await this.ensureFile();
    const raw = await fs.readFile(this.filePath, "utf8");
    this.data = JSON.parse(raw) as T;
    return this.data;
  }

  async save(newData: T): Promise<void> {
    await this.ensureFile();
    const content = JSON.stringify(newData, null, 2);
    const tmp = `${this.filePath}.tmp`;
    await fs.writeFile(tmp, content, "utf8");
    await fs.rename(tmp, this.filePath);
    this.data = newData;
  }
}
