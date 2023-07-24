import { useEffect } from "react";

function ImportExternalScript({ src, mode = "none", callback, errorHandler }) {
  const importScript = () => {
    const previous = document.querySelector(`script[src="${src}"]`);
    if (previous === null) {
      const script = document.createElement("script");
      script.src = src;
      setScriptMode(mode)(script);

      script.addEventListener(
        "load",
        () => callback instanceof Function && callback()
      );
      script.addEventListener(
        "error",
        () => errorHandler instanceof Function && errorHandler()
      );

      document.head.appendChild(script);
      return () => document.head.removeChild(script);
    }
  };

  useEffect(importScript, []);
  return <></>;
}

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

export default ImportExternalScript;
