
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
> {}