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
  };

  const scrollToPage = (node) => node.scrollIntoView({ behavior: "smooth" });

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
    threshold: 0.51,
  });

  useEffect(initPages, []);

  // `initPages` 가 re-rendering 된 이후 그 결과로 pages 변화를 감지해 실행되어야 하므로
  // 그 다음 라이프 사이프 사이클에 작동할 수 있도록 분리시켰다.
  useEffect(() => {
    pages.forEach((page) => {
      observer.observe(page);
    });
  }, [pages]);

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
