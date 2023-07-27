import React from "react";
import $K from "../../modules/data/Constants";
import { btnScrollTargetClass } from "./Btns";

function Visual(props) {
  return (
    <figure
      id="visual"
      className={btnScrollTargetClass}
      data-page-name="visual"
    >
      <video src={`${$K.PUBLIC_URL}/img/vid.mp4`} muted loop autoPlay></video>
    </figure>
  );
}

export default Visual;
