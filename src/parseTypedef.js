export default (typedefs) => {
  const entries = Object.entries(typedefs);
  if (!entries.length) return "";
  return entries
    .reduce((acc, [name, { value }]) => {
      acc.push(`declare type ${name} = ${value};`);
      return acc;
    }, [])
    .join("\n");
};
