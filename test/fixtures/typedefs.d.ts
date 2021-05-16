declare type AuthorName = string;
declare type Author = { name?: AuthorName; dob?: string; };
interface typedefsProps {
  /**
   * @default {}
   */
  author?: object;
  
  /**
   * @default []
   */
  authors?: Author[];
}

declare class typedefs extends SvelteComponentTyped<
  typedefsProps,
  {},
  {}
> {}