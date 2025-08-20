import fs from "fs";
import path from "path";
import glob from "glob";

const files = glob.sync("src/**/*.{ts,tsx}", { absolute: true });

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let newContent = content;

  newContent = newContent.replace(
    /import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?/g,
    (match, imports, from) => {
      // 1. Nie tykamy reacta ani contextów
      if (from.includes("react") || from.includes("context")) return match;

      const names = imports.split(",").map((x) => x.trim());

      const types = names.filter((n) => /^[A-Z]/.test(n)); // potencjalne typy
      const values = names.filter((n) => /^[a-z]/.test(n)); // runtime

      if (types.length && !values.length) {
        return `import type { ${types.join(", ")} } from "${from}";`;
      } else if (types.length && values.length) {
        return `import { ${values.join(", ")} } from "${from}";
import type { ${types.join(", ")} } from "${from}";`;
      }

      return match;
    }
  );

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, "utf8");
    console.log(`✔ Poprawiono importy w ${path.relative(process.cwd(), file)}`);
  }
});
