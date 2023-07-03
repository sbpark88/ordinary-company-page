import "./scss/style.scss";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Banner from "./components/main/Banner";
import Btns from "./components/main/Btns";
import News from "./components/main/News";
import Pics from "./components/main/Pics";
import Vids from "./components/main/Vids";
import Visual from "./components/main/Visual";

import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Department from "./pages/Department";
import Gallery from "./pages/Gallery";
import Members from "./pages/Members";
import Youtube from "./pages/Youtube";
import { Route } from "react-router-dom";
import { viewUrl } from "./modules/data/URL";

function App() {
  return (
    <>
      <Header />

      <Route exact path={viewUrl?.root}>
        <Banner />
        <Btns />
        <News />
        <Pics />
        <Vids />
        <Visual />
      </Route>

      <Route path={viewUrl?.department} component={Department} />
      <Route path={viewUrl?.community} component={Community} />
      <Route path={viewUrl?.gallery} component={Gallery} />
      <Route path={viewUrl?.youtube} component={Youtube} />
      <Route path={viewUrl?.contact} component={Contact} />
      <Route path={viewUrl?.members} component={Members} />

      <Footer />
    </>
  );
}

export default App;
