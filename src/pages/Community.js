import React from "react";
import Layout from "../components/layout/Layout";
import Constants from "../modules/data/Constants";

function Community(props) {
  return (
    <Layout
      name={"Community"}
      backgroundImageUrl={`${Constants.PUBLIC_URL}/img/Community.jpg`}
    >
      Community
    </Layout>
  );
}

export default Community;
