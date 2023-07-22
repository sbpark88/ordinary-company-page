export const applyMapToObject = (obj) => (fn) =>
  Object.entries(obj).map(([key, value]) => fn(key, value));
