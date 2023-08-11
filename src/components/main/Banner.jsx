import React, { memo } from "react";
import { btnScrollTargetClass } from "./Btns";

function Banner(props) {
  return (
    <section
      id="banner"
      className={btnScrollTargetClass}
      data-page-name="banner"
    >
      <h1>Banner</h1>
    </section>
  );
}

export default memo(Banner);
