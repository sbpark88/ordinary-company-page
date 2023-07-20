export const loadScript = ({ src, mode = "none" }) =>
  new Promise((resolve, reject) => {
    try {
      const previous = document.querySelector(`script[src="${src}"]`);
      if (previous === null) {
        const script = document.createElement("script");
        script.src = src;
        setScriptMode(mode)(script);

        script.addEventListener("load", () =>
          resolve({
            load: true,
            removeScript: () => document.head.removeChild(script),
          })
        );
        script.addEventListener("error", () =>
          reject({
            load: false,
            message: `Fail to load external script from ${src}`,
          })
        );

        document.head.appendChild(script);
      } else {
        resolve({
          load: true,
          removeScript: () => document.head.removeChild(previous),
        });
      }
    } catch (e) {
      throw new Error(`Fail to load external script`);
    }
  });

const setScriptMode = (mode) => {
  switch (mode) {
    case "async":
      return (script) => (script.async = true);
    case "defer":
      return (script) => (script.defer = true);
    default:
      return () => undefined;
  }
};
