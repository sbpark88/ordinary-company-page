import "./scss/style.scss";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";

import Banner from "./component/main/Banner";
import Btns from "./component/main/Btns";
import News from "./component/main/News";
import Pics from "./component/main/Pics";
import Vids from "./component/main/Vids";
import Visual from "./component/main/Visual";

import Community from "./component/sub/Community";
import Contact from "./component/sub/Contact";
import Department from "./component/sub/Department";
import Gallery from "./component/sub/Gallery";
import Members from "./component/sub/Members";
import Youtube from "./component/sub/Youtube";
import { Route } from "react-router-dom";

function App() {
  const rootUrl = "/";
  const viewUrl = {
    community: "/community",
    contact: "/contact",
    department: "/department",
    gallery: "/gallery",
    members: "/members",
    youtube: "/youtube",
  };
  return (
    <>
      <Header />

      <Route exact path={rootUrl}>
        <Banner />
        <Btns />
        <News />
        <Pics />
        <Vids />
        <Visual />
      </Route>

      <Route path={viewUrl?.community} component={Community} />
      <Route path={viewUrl?.contact} component={Contact} />
      <Route path={viewUrl?.department} component={Department} />
      <Route path={viewUrl?.gallery} component={Gallery} />
      <Route path={viewUrl?.members} component={Members} />
      <Route path={viewUrl?.youtube} component={Youtube} />

      <Footer />
    </>
  );
}

export default App;
