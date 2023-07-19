import React, { useEffect, useRef, useState } from "react";

function Btns(props) {
  const btnRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(INITIAL_PAGE);
  const initPages = () => {
    const nodes = btnRef?.current?.parentElement?.querySelectorAll(
      `.${btnScrollTargetClass}`
    );
    setPages([...nodes]);

    /**
     * 화면에 보여지는 페이지를 추적해 페이징 버튼 활성화를 업데이트한다.
     * @param entries - Front main pages, e.g. "visual, news, ..."
     * @param observer - Observer instance
     */
    const trackCurrentPage = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activePage = entries[0]?.target?.dataset?.pageName;
          setActivePage(activePage);
        }
      });
    };

    const observer = new IntersectionObserver(trackCurrentPage, {
      threshold: [0.51, 0.75, 1],
    });

    nodes.forEach((page) => observer.observe(page));
  };

  const scrollToPage = (node) => node.scrollIntoView({ behavior: "smooth" });

  useEffect(initPages, []);

  return (
    <ul id="scroll_navi" ref={btnRef}>
      {pages.map((page, index) => (
        <li
          key={page?.id}
          data-page-name={page?.id}
          className={page?.id === activePage ? "on" : undefined}
          onClick={() => scrollToPage(page)}
        />
      ))}
    </ul>
  );
}

export default Btns;

const INITIAL_PAGE = "visual";
const btnScrollTargetClass = "btn-scroll";

export { btnScrollTargetClass };
