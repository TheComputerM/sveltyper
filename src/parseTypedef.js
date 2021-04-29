export default (typedefs) => {
  if (!typedefs) return "";
  return Object.entries(typedefs)
    .reduce((acc, [name, { value }]) => {
      acc.push(`type ${name} = ${value};`);
      return acc;
    }, [])
    .join("\n");
};
