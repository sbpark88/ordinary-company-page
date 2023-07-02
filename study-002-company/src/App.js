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

function App() {
  return (
    <>
      <Header />

      <Banner />
      <Btns />
      <News />
      <Pics />
      <Vids />
      <Visual />

      <Community />
      <Contact />
      <Department />
      <Gallery />
      <Members />
      <Youtube />

      <Footer />
    </>
  );
}

export default App;
