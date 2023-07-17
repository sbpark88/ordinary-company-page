import React from "react";
import { btnScrollTargetClass } from "./Btns";

function News(props) {
  return (
    <section id="news" className={btnScrollTargetClass} data-page-name="news">
      <h1>News</h1>
    </section>
  );
}

export default News;
