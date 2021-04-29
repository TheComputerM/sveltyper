
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
> {}