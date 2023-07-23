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
import { ViewUrl } from "./modules/data/URL";
import FrontMain from "./components/main/FrontMain";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {/* Switch 내부에 중복되는 라우트에 대한 switch 처리를 자동으로 해준다 */}
      <Switch>
        <Route exact path={ViewUrl?.root} component={FrontMain} />
        <Route path={ViewUrl?.root} render={() => <Header type="sub" />} />
      </Switch>

      <Route path={ViewUrl?.department} component={Department} />
      <Route path={ViewUrl?.community} component={Community} />
      <Route path={ViewUrl?.gallery} component={Gallery} />
      <Route path={ViewUrl?.youtube} component={Youtube} />
      <Route path={ViewUrl?.contact} component={Contact} />
      <Route path={ViewUrl?.members} component={Members} />

      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
