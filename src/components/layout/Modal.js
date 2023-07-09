import React, { forwardRef } from "react";

const Modal = forwardRef((props, ref) => {
  return (
    <aside className="modal" ref={ref}>
      <div className="con"></div>
      <span className="close">close</span>
    </aside>
  );
});

export default Modal;
