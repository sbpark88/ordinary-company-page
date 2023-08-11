import Visual from "../components/main/Visual";
import News from "../components/main/News";
import Pics from "../components/main/Pics";
import Vids from "../components/main/Vids";
import Banner from "../components/main/Banner";
import Btns from "../components/main/Btns";

function FrontMain(props) {
  return (
    <main>
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
