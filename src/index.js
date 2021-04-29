import parseFile from "./parseFile";

const doc = require("svelte-docster");
const path = require("path");

export default ({ file, content, filename }) => {
  const info = doc({ file, content, filename });
  const name = path.basename(file || filename, ".svelte");
  return parseFile(info, name);
};
