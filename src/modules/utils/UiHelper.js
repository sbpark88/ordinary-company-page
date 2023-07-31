import { toast } from "react-toastify";
import $K from "../data/Constants";

export const preventWindowScroll = (stopScroll) => () =>
  stopScroll
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

export const Toast = {
  info: (content) => toast.info(content, $K.TOAST_POSITION),
  success: (content) => toast.success(content, $K.TOAST_POSITION),
  error: (content) => toast.error(content, $K.TOAST_POSITION),
};
