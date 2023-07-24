import React from "react";
import Layout from "../components/layout/Layout";
import Constants from "../modules/data/Constants";

function Members(props) {
  return (
    <Layout
      name={"Member"}
      backgroundImageUrl={`${Constants.PUBLIC_URL}/img/Members.jpg`}
    >
      Member
    </Layout>
  );
}

export default Members;
