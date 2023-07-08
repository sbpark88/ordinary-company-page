import React from "react";

function Layout({ name, children }) {
  return (
    <section className={`content ${name.toLowerCase()}`}>
      <figure></figure>
      <div className="inner">
        <h1>{name}</h1>
        {children}
      </div>
    </section>
  );
}

export default Layout;
