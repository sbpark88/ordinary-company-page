import React, { useEffect, useRef, useState } from "react";
function Btns(props) {
  const btnRef = useRef(null);
  const [pages, setPages] = useState([]);
  const initPages = () => {
    const nodes =
      btnRef?.current?.parentElement?.querySelectorAll(".btn-scroll");
    setPages([...nodes]);
  };

  useEffect(initPages, []);

  return (
    <ul id="scroll_navi" ref={btnRef}>
      {pages.map((page) => (
        <li key={page?.id} id={page?.id} />
      ))}
    </ul>
  );
}

export default Btns;
