
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
> {}