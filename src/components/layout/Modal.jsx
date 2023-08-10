import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { preventWindowScroll } from "../../modules/utils/UiHelper";
import { AnimatePresence, motion } from "framer-motion";

const Modal = forwardRef(({ children }, ref) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const raiseUp = {
    openModal: openModal,
  };

  useImperativeHandle(ref, () => raiseUp);

  // prevent scroll when modal is opened
  const preventBackgroundScroll = preventWindowScroll(open);

  useEffect(preventBackgroundScroll, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside className="modal" {...modalMotion}>
            <motion.div className="content" {...contentMotion}>
              {children}
            </motion.div>
            <motion.span
              className="btn-close"
              onClick={closeModal}
              {...btnCloseMotion}
            >
              close
            </motion.span>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
});

Modal.displayName = "Modal";

export default Modal;

const modalMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const contentMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.3 } },
};

const btnCloseMotion = {
  initial: { scale: 0, y: "200%" },
  animate: { scale: 1, y: 0, transition: { delay: 0.3 } },
  exit: { scale: 3 },
};
