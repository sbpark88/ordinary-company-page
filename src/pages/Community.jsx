import React from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";

function Community(props) {
  return (
    <Layout
      name={"Community"}
      backgroundImageUrl={`${$K.PUBLIC_URL}/img/Community.jpg`}
    >
      Community
    </Layout>
  );
}

export default Community;
