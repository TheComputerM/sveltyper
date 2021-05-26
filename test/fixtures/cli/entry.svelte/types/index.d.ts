// Created using 'sveltyper' by TheComputerM
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
export default index