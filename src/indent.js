export default (str, indent) =>
  str
    .split("\n")
    .map((line) => " ".repeat(indent) + line)
    .join("\n");
