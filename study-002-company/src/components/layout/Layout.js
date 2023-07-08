import React from "react";

function Layout({ name, children, backgroundImage }) {
  return (
    <section className={`content ${name.toLowerCase()}`}>
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
