import React, { memo } from "react";
import { btnScrollTargetClass } from "./Btns";

function Vids(props) {
  return (
    <section id="vids" className={btnScrollTargetClass} data-page-name="vids">
      <h1>Youtube</h1>
    </section>
  );
}

export default memo(Vids);
