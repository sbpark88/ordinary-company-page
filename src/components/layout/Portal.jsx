import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  return createPortal(children, document.getElementById("portal"));
};
