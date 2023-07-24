import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { preventWindowScroll } from "../../modules/utils/UiHelper";

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
      {open && (
        <aside className="modal" ref={ref}>
          <div className="con">{children}</div>
          <span className="close" onClick={closeModal}>
            close
          </span>
        </aside>
      )}
    </>
  );
});

Modal.displayName = "Modal";

export default Modal;
