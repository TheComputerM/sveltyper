import doc from "svelte-docster";
import path from "path";
import indent from "./indent";
import parseTypedef from "./parseTypedef";
import parseProps from "./parseProps";
import parseRestProps from "./parseRestProps";
import parseSlots from "./parseSlots";
import parseEvents from "./parseEvents";

const parseFile = (info, name) =>
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


export default ({ file, content, filename }) => {
  const info = doc({ file, content, filename });
  const name = path.basename(file || filename, ".svelte");
  return parseFile(info, name);
};
