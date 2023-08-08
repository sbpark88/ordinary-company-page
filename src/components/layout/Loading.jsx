import $K from "../../modules/data/Constants";
import { Portal } from "./Portal";

export const Loading = () => {
  return (
    <Portal>
      <img
        src={`${$K.PUBLIC_URL}/img/loading.gif`}
        alt="Loading..."
        style={style}
      />
    </Portal>
  );
};

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
