import indent from "./indent";
import parseTypedef from "./parseTypedef";
import parseProps from "./parseProps";
import parseRestProps from "./parseRestProps";
import parseSlots from "./parseSlots";
import parseEvents from "./parseEvents";

export default (info, name) =>
  [
    parseTypedef(info.typedef),
    `interface ${name}Props ${parseRestProps(info.restProps)}{`,
    indent(parseProps(info.props), 2),
    "}",
    "",
    `declare class ${name} extends SvelteComponentTyped<`,
    indent(`${name}Props,`, 2),
    indent(parseEvents(info.events), 2) + ",",
    indent(parseSlots(info.slots), 2),
    "> {}",
  ].join("\n");
