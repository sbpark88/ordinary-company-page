import React from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";

function Gallery(props) {
  return (
    <Layout
      name={"Gallery"}
      backgroundImageUrl={`${$K.PUBLIC_URL}/img/Gallery.jpg`}
    >
      Gallery
    </Layout>
  );
}

export default Gallery;
