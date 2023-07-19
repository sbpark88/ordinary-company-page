export const throttle = (fn, delay = 500) => {
  let available = true;

  return (...args) => {
    if (available) {
      available = false;
      fn(...args);
      const timer = setTimeout(() => {
        available = true;
        clearTimeout(timer);
      }, delay);
    }
  };
};

export const debounce = (fn, delay = 500) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  };
};
