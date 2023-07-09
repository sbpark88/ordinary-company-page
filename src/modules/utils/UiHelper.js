export const preventWindowScroll = (stopScroll) => () =>
  stopScroll
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
