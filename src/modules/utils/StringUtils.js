export const dropLongString = (str, length) => {
  if ("string" !== typeof str) return;
  return str.length > length ? str.slice(0, length) + "..." : str;
};
