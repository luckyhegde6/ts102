import { UserService } from "./services/UserService";

async function runDemo() {
  const svc = new UserService();
  await svc.init();
  const u = await svc.create({ name: "Demo", email: "demo@example.com", age: 30 });
  console.log("Created:", u);
  console.log("All:", await svc.list());
}

if (require.main === module) {
  runDemo().catch(console.error);
}
