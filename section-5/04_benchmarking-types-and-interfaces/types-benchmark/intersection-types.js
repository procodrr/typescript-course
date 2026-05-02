import { writeFile } from "node:fs/promises";

const TOTAL_USERS = 2000;
const outputFile = "users.ts";

function generateTypeFile(totalUsers) {
  const lines = [];

  for (let i = 1; i <= totalUsers; i++) {
    const current = `User${i}`;
    const parent = i > 1 ? `User${i - 1} & ` : "";

    lines.push(`type ${current} = ${parent}{`);
    lines.push(`  id${i}: string;`);
    lines.push(`  name${i}: string;`);
    lines.push(`  age${i}: number;`);
    lines.push(`  active${i}: boolean;`);
    lines.push("};");
    lines.push("");
  }

  lines.push(`const sampleUser: User${totalUsers} = {`);
  for (let i = 1; i <= totalUsers; i++) {
    lines.push(`  id${i}: "id-${i}",`);
    lines.push(`  name${i}: "User ${i}",`);
    lines.push(`  age${i}: ${20 + (i % 30)},`);
    lines.push(`  active${i}: ${i % 2 === 0 ? "true" : "false"},`);
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

async function main() {
  const content = generateTypeFile(TOTAL_USERS);
  await writeFile(outputFile, content, "utf8");

  console.log(`Generated: ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
