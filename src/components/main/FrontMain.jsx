import Header from "../layout/Header";
import Visual from "./Visual";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Banner from "./Banner";
import Btns from "./Btns";

function FrontMain(props) {
  return (
    <main>
      <Header type={"main"} />
      <Visual />
      <News />
      <Pics />
      <Vids />
      <Banner />
      <Btns />
    </main>
  );
}

export default FrontMain;
