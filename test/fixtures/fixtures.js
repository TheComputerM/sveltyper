const fs = require("fs");
const path = require("path");
const generate = require("../../dist/index");

const tests = ["props", "slots", "events", "restProps", "typedefs"];
tests.forEach((t) => {
  const file = path.join(__dirname, `${t}.svelte`);
  const content = generate({ file });
  fs.writeFileSync(file.replace(".svelte", ".d.ts"), content);
});
