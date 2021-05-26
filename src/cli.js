import { parseModule } from "meriyah";
import { walk } from "astray";
import parseSvelte from "./index";

import path from "path";
import fs from "fs";

const pkgPath = path.resolve("./package.json");
if (!fs.existsSync(pkgPath)) throw new Error("package.json not found");
const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
if (!pkg.svelte) throw new Error("svelte field in package.json not found");

const entry = path.resolve(pkg.svelte);
const dist = process.argv[3] || path.resolve("./types");
fs.mkdirSync(dist, { recursive: true });

const banner = [
  "// Created using 'sveltyper' by TheComputerM",
  '/// <reference types="svelte" />',
  'import { SvelteComponentTyped } from "svelte";',
].join("\n");

let output;

if (path.extname(entry) === ".svelte") {
  const name = path.basename(entry, ".svelte");
  const parsed = parseSvelte({ file: entry });
  output = [banner, parsed, `export default ${name}`].join("\n");
} else {
  function createDependencyTree(content, importer) {
    const tree = {};
    const ast = parseModule(content);
    walk(ast, {
      ExportNamedDeclaration(node) {
        const importedPath = node.source;
        if (importedPath && importedPath.value.endsWith(".svelte")) {
          node.specifiers.forEach((exported) => {
            if (exported.local.name === "default") {
              tree[exported.exported.name] = path.resolve(
                path.dirname(importer),
                importedPath.value
              );
            }
          });
        }
      },
    });
    return tree;
  }

  const input = fs.readFileSync(entry).toString();
  const tree = createDependencyTree(input, entry);

  const parsed = Object.entries(tree)
    .reduce((acc, [name, location]) => {
      if (name === "default") {
        acc.push(
          [
            parseSvelte(info, "DefaultComponent"),
            "export default DefaultComponent;",
          ].join("\n")
        );
      } else {
        acc.push([parseSvelte({file:location}), `export { ${name} };`].join("\n"));
      }
      return acc;
    }, [])
    .join("\n\n");

  output = banner + "\n" + parsed;
}

fs.writeFileSync(path.join(dist, "./index.d.ts"), output);
