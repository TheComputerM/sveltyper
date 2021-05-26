export default (str, indent) =>
  str
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : " ".repeat(indent) + line))
    .join("\n");
