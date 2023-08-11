import React, { memo } from "react";
import { btnScrollTargetClass } from "./Btns";

function Pics(props) {
  return (
    <section id="pics" className={btnScrollTargetClass} data-page-name="pics">
      <h1>Pics</h1>
    </section>
  );
}

export default memo(Pics);
