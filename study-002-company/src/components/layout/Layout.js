import React, { useEffect, useRef, useState } from "react";

function Layout({ name, children, backgroundImage }) {
  const section = useRef(null);

  useEffect(function activation() {
    const _section = section.current;
    _section.classList.add("on");
    return () => {
      // useRef 로는 얘를 비동기적으로 처리가 안 된다.
      // 나중에 forwardRef 를 사용해 해결.
      _section.classList.remove("on");
    };
  }, []);

  return (
    <section className={`content ${name.toLowerCase()}`} ref={section}>
      {/*
      React 는 SCSS 파일에 대한 접근을 하지 못하기 때문에 SCSS 에
      배경 이미지를 지정하고 동적으로 가져와 컴파일 할 수 없기 때문에
      props 로 전달하거나 styled component, tailwind css 등을 이용한다.
       */}
      <figure style={{ backgroundImage: backgroundImage }}></figure>
      <div className="inner">
        <h1>{name}</h1>
        {children}
      </div>
    </section>
  );
}

export default Layout;
