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
import { Route, Switch } from "react-router-dom";
import { viewUrl } from "./modules/data/URL";

function App() {
  return (
    <>
      {/* Switch 내부에 중복되는 라우트에 대한 switch 처리를 자동으로 해준다 */}
      <Switch>
        <Route exact path={viewUrl?.root}>
          <Header type={"main"} />
          <Visual />
          <News />
          <Pics />
          <Vids />
          <Banner />
          <Btns />
        </Route>

        <Route path={viewUrl?.root}>
          <Header type={"sub"} />
        </Route>
      </Switch>

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
