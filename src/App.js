import "./scss/style.scss";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Department from "./pages/Department";
import Gallery from "./pages/Gallery";
import Members from "./pages/Members";
import Youtube from "./pages/Youtube";
import { Route, Switch } from "react-router-dom";
import { viewUrl } from "./modules/data/URL";
import FrontMain from "./components/main/FrontMain";

function App() {
  return (
    <>
      {/* Switch 내부에 중복되는 라우트에 대한 switch 처리를 자동으로 해준다 */}
      <Switch>
        <Route exact path={viewUrl?.root} component={FrontMain} />
        <Route path={viewUrl?.root} render={() => <Header type="sub" />} />
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
