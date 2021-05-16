function comment({ description, value, valueType }) {
  const noDescription = !description;
  const noValue = !value || valueType === "Identifier";

  if (noDescription && noValue) return "";

  const output = ["/**"];
  if (!noDescription) output.push(` * ${description}`);
  if (!noValue) output.push(` * @default ${value}`);
  output.push(" */");
  return output.join("\n");
}

export default (props) => {
  const output = [];
  for (const [name, prop] of Object.entries(props)) {
    if (prop.kind === "let") {
      let type = "any";
      const typeTag = prop.tags.find(({ tag }) => tag === "type");
      if (typeTag) type = typeTag.type;
      else if (prop.value === "''") type = 'string';
      else if (prop.value != null) {
        try {
          type = typeof JSON.parse(prop.value);
        } catch {}
      }

      const value = `${name}${prop.required ? "" : "?"}: ${type};`;
      output.push(comment(prop) + "\n" + value);
    }
  }
  return output.join("\n\n");
};
