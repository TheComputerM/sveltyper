import { test } from "uvu";
import { fixture } from "uvu/assert";
import generate from "../src/index";

import path from "path";
import { assert } from "console";

const tests = ["props", "slots", "events", "restProps", "typedefs"];

function read(filename) {
  const file = path.join(__dirname, "fixtures", `${filename}.svelte`);
  return generate({ file });
}

test("events", () => {
  fixture(
    read("events"),
    `
  interface eventsProps {
    /**
     * @default ""
     */
    key?: string;
  }

  declare class events extends SvelteComponentTyped<
    eventsProps,
    {'button:key': { key: string }; click: WindowEventMap["click"];},
    {}
  > {}`
  );
});

test("slots", () => {
  fixture(
    read("slots"),
    `
  interface slotsProps {
    /**
     * @default 0
     */
    prop?: number;
  }

  declare class slots extends SvelteComponentTyped<
    slotsProps,
    {},
    {default: {}; description: { props: { class?: string; } };}
  > {}`
  );
});

test("props", () => {
  fixture(
    read("props"),
    `
  interface propsProps {
    /**
     * Some description.
     */
    required: any;

    /**
     * @default true
     */
    cool?: boolean;


    noDefault?: any;
  }

  declare class props extends SvelteComponentTyped<
    propsProps,
    {},
    {}
  > {}`
  );
});

test("e2e typedefs", () => {
  fixture(
    read("typedefs"),
    `declare type AuthorName = string;
declare type Author = { name?: AuthorName; dob?: string; };
interface typedefsProps {
  /**
   * @default {}
   */
  author?: Author;

  /**
   * @default []
   */
  authors?: Author[];
}

declare class typedefs extends SvelteComponentTyped<
  typedefsProps,
  {},
  {}
> {}`
  );
});

test("e2e restProps", () => {
  fixture(
    read("restProps"),
    `
    interface restPropsProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["h1"]>, svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["button"]> {

    }

    declare class restProps extends SvelteComponentTyped<
      restPropsProps,
      {},
      {default: {};}
    > {}`
  );
})


test.run();
