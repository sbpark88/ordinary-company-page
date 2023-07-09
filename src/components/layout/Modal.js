import React, { forwardRef, useImperativeHandle, useState } from "react";

const Modal = forwardRef(({ children }, ref) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const raiseUp = {
    openModal: openModal,
  };

  useImperativeHandle(ref, () => raiseUp);

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

export default Modal;
