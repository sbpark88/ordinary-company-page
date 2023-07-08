import React from "react";
import Constants from "../../modules/data/Constants";

function Visual(props) {
  return (
    <figure id="visual">
      <video
        src={`${Constants.PUBLIC_URL}/img/vid.mp4`}
        muted
        loop
        autoPlay
      ></video>
    </figure>
  );
}

export default Visual;
