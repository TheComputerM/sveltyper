export default (slots) => {
  const output = Object.entries(slots)
    .reduce((acc, [name, slot]) => {
      const type = slot.type || "{}";
      acc.push(`${name}: ${type};`);
      return acc;
    }, [])
    .join(" ");
  return "{" + output + "}";
};
