import { test } from "uvu";
import { fixture } from "uvu/assert";
import generate from "../src/index";

const { readFileSync } = require("fs");
const path = require("path");

const tests = ["props", "slots", "events", "restProps", "typedefs"];

tests.forEach((t) => {
  test(t, () => {
    const file = path.join(__dirname, "fixtures", `${t}.svelte`);
    const input = readFileSync(file.replace(".svelte", ".d.ts")).toString();
    const output = generate({ file });
    fixture(input, output);
  });
});

test.run();
