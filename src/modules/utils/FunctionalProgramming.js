export const pipe =
  (...fns) =>
  (initValue) =>
    fns.reduce((acc, fn) => fn(acc), initValue);

export const curry = (fn) => {
  return function curryFn(...args1) {
    if (args1.length >= fn.length) {
      return fn(...args1);
    } else {
      return (...args2) => {
        return curryFn(...args1, ...args2);
      };
    }
  };
};
