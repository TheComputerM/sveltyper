import { test } from "uvu";
import { fixture } from "uvu/assert";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

const fixtures = path.join(__dirname, "fixtures", "cli");

test.before(() => {
  const typesdir = ["entry.svelte", "entry.js"];
  typesdir.forEach((_dir) => {
    const dir = path.join(fixtures, _dir, "types");
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, {
        recursive: true,
      });
    }
  });
});

test("entry.svelte", () => {
  execSync(`jiti "${path.resolve("src", "cli.js")}"`, {
    cwd: path.join(fixtures, "entry.svelte"),
  });
  const dts = fs
    .readFileSync(path.join(fixtures, "entry.svelte/types/index.d.ts"))
    .toString();

  fixture(
    dts,
    `// Created using 'sveltyper' by TheComputerM
/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

interface indexProps {
  /**
   * Prop Description
   * @default "Hello"
   */
  a?: string;
}

declare class index extends SvelteComponentTyped<
  indexProps,
  {},
  {}
> {}
export default index`
  );
});

test("entry.svelte", () => {
  execSync(`jiti "${path.resolve("src", "cli.js")}"`, {
    cwd: path.join(fixtures, "entry.js"),
  });
  const dts = fs
    .readFileSync(path.join(fixtures, "entry.js/types/index.d.ts"))
    .toString();

  fixture(
    dts,
    `// Created using 'sveltyper' by TheComputerM
/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

interface C1Props {

}

declare class C1 extends SvelteComponentTyped<
  C1Props,
  {},
  {}
> {}
export { C1 };


interface C2Props {

}

declare class C2 extends SvelteComponentTyped<
  C2Props,
  {},
  {}
> {}
export { C2 };`
  );
});

test.run();
