import { test } from "uvu";
import { fixture } from "uvu/assert";
import generate from "../src/index";
import path from "path";

function read(filename) {
  const file = path.join(__dirname, "fixtures", filename);
  return generate({ file });
}

test("e2e events", () => {
  fixture(
    read("events.svelte"),
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

test("e2e slots", () => {
  fixture(
    read("slots.svelte"),
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

test("e2e props", () => {
  fixture(
    read("props.svelte"),
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
    read("typedefs.svelte"),
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
    read("restProps.svelte"),
    `
    interface restPropsProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["h1"]>, svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["button"]> {

    }

    declare class restProps extends SvelteComponentTyped<
      restPropsProps,
      {},
      {default: {};}
    > {}`
  );
});

test.run();
