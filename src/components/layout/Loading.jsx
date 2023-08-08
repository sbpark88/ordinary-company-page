import $K from "../../modules/data/Constants";

export const Loading = () => {
  return (
    <div style={frameBackgroundStyle}>
      <img
        src={`${$K.PUBLIC_URL}/img/loading.gif`}
        alt="Loading..."
        style={style}
      />
    </div>
  );
};

const style = {
  position: "fixed",
  top: "50vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "whtie",
};

const frameBackgroundStyle = {
  top: 0,
  position: "absolute",
  backgroundColor: "wheat",
  width: "100%",
  height: "100%",
  opacity: 0.95,
};
