import React, { useEffect, useRef, useState } from "react";
import { debounce } from "../../modules/utils/Performance";

function Btns(props) {
  const btnRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState("");

  const initPages = () => {
    const nodes = btnRef?.current?.parentElement?.querySelectorAll(
      `.${btnScrollTargetClass}`
    );
    setPages([...nodes]);
  };

  const scrollToPage = (node) => node.scrollIntoView({ behavior: "smooth" });

  const findNodeAndScroll = (id) => {
    if (id === undefined) return;
    const targetNode = pages.filter((page) => page?.id === id)[0];
    targetNode?.scrollIntoView({ behavior: "smooth" });
  };
  const debouncedFindNodeAndScroll = debounce(findNodeAndScroll, 500);

  // COMMENT: 1. 하위 컴포넌트 페이지 element 를 찾는다.
  //  여기서 setPages 를 하기 때문에 함수에서 접근하려는 경우 pages 를 의존성으로 갖는 useEffect 가 반드시 존재해야한다.
  useEffect(initPages, []);

  // COMMENT: 2. 'setViewPositionObserver' 함수와 'findNodeAndScroll' 함수에서 pages 를 사용하기 위해
  //  pages 를 의존성으로 갖는 useEffect 에서 실행 후 re-render 가 이루어져야한다.
  useEffect(
    function initPagesAfterSetPages() {
      let observer, scrollCallback; // for unmount

      /**
       * 화면에 보여지는 페이지를 추적해 페이징 버튼 활성화를 업데이트한다.
       * @param entries - Front main pages, e.g. "visual, news, ..."
       * @param observer - Observer instance
       */
      function trackCurrentPage(entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activePage = entry.target?.dataset?.pageName;
            setActivePage(activePage);
            scrollCallback = () => debouncedFindNodeAndScroll(activePage);
            window.addEventListener("scroll", scrollCallback);
          }
        });
      }

      observer = new IntersectionObserver(trackCurrentPage, {
        threshold: [0.51, 0.75, 1],
      });

      pages.forEach((page) => observer.observe(page));

      return () => {
        pages.forEach((page) => observer.unobserve(page));
        window.removeEventListener("scroll", scrollCallback);
      };
    },
    [pages]
  );

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

const btnScrollTargetClass = "btn-scroll";

export { btnScrollTargetClass };
